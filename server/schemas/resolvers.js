const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Question, Comment } = require("../models");
const {
  signToken,
  generateResetToken,
  verifyResetToken,
} = require("../utils/auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // get me (logged in user)
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate({
            path: "comments",
            populate: "replies",
          })
          .populate({
            path: "questions",
            populate: "answers",
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // get all comments
    comments: async (parent, { commentedBook }) => {
      const params = commentedBook ? { commentedBook } : {};
      return await Comment.find(params)
        .sort({ createdAt: -1 })
        .populate("replies");
    },

    // get a single comment by its _id
    comment: async (parent, { thoughtId }) => {
      return await Comment.findOne({ _id: thoughtId }).populate("replies");
    },

    // get all questions
    questions: async () => {
      return await Question.find().sort({ createdAt: -1 }).populate("answers");
    },

    // get a single question by its _id
    question: async (parent, { questionId }) => {
      return await Question.findOne({ _id: questionId }).populate("answers");
    },
  },

  Mutation: {
    // add a user
    addUser: async (parent, { username, email, password, userIcon }) => {
      const user = await User.create({ username, email, password, userIcon });
      const token = signToken(user);
      return { token, user: { _id: user._id, username, email, userIcon } };
    },

    // login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    //  remove user
    removeUser: async (parent, password, context) => {
      console.log(context.user);

      if (context.user) {
        // Find the user and check if provided password is correct
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(password.password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Proceed with removing the user
        const removedUser = await User.findByIdAndDelete(context.user._id);
        return removedUser;
      }
    },

    //  update user
    updateUser: async (
      parent,
      { username, email, password, userIcon },
      context
    ) => {
      if (context.user) {
        // Find the user and check if current password is correct
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Proceed with updating the user
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            username,
            email,
            userIcon,
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    // update user's password
    updatePassword: async (parent, { password, newPassword }, context) => {
      if (context.user) {
        // Find the user and check if current password is correct
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Check in new password's length is less than 5 characters
        if (newPassword && newPassword.length < 5) {
          throw new AuthenticationError(
            "Password is shorter than the minimum allowed length (5)."
          );
        }

        // Hash the new password
        let hashedPassword;
        if (newPassword) {
          const saltRounds = 10;
          hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        }

        // Proceed with updating the user's password
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            password: hashedPassword,
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    // request password reset
    requestPasswordReset: async (parent, { email }) => {
      // find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      console.log(user);

      // generate a password reset token
      const resetToken = generateResetToken(user);
      console.log(resetToken);

      // send the password reset email
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: "Password Reset",
        text: `Hi ${user.username},\n\nIt seems like you forgot your password for Samuel J. Halpn portal. If this is true, click the link below to reset your password. This link will expire in 1 hour.\n\n
        Reset my password:\n\n${process.env.CLIENT_URL}/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      try {
        let emailResponse = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + emailResponse.response);
      } catch (err) {
        console.error("Error sending email: ", err);
        throw new Error("Failed to send password reset email");
      }

      return user;
    },

    // reset password
    resetPassword: async (parent, { token, newPassword }) => {
      // verify the reset token
      const { email } = verifyResetToken(token);
      console.log(email);

      if (!email) {
        throw new AuthenticationError("Invalid or expired token");
      }

      // find the user by email and update the password
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new AuthenticationError("No user with this email found");
      }

      return updatedUser;
    },

    // add comment
    addComment: async (parent, { commentedBook, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentedBook,
          commentText,
          commentAuthor: context.user.username,
          authorIcon: context.user.userIcon,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } },
          { new: true }
        );

        return comment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // remove comment
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { comments: comment._id } },
          { new: true }
        );

        return comment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // add reply
    addReply: async (parent, { commentId, replyText }, context) => {
      if (context.user) {
        return Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $addToSet: {
              replies: {
                replyText,
                replyAuthor: context.user.username,
                authorIcon: context.user.userIcon,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // remove reply
    removeReply: async (parent, { commentId, replyId }, context) => {
      if (context.user) {
        return Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $pull: {
              replies: { _id: replyId, replyAuthor: context.user.username },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // add question
    addQuestion: async (parent, { questionText }, context) => {
      if (context.user) {
        const question = await Question.create({
          questionText,
          questionAuthor: context.user.username,
          authorIcon: context.user.userIcon,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { questions: question._id } },
          { new: true }
        );

        // Send email to the author about the new question
        let transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: 465,
          secure: true, // use SSL
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: "samuel.j.halpin@gmail.com",
          subject: "New Question From Your Portal",
          text: `Hi Samuel,\n\nA new question has been posted on your portal. Please check it out.\n\n
          Question:\n\n${questionText}\n\n Login to portal:\n\n${process.env.CLIENT_URL}\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return question;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // remove question
    removeQuestion: async (parent, { questionId }, context) => {
      if (context.user) {
        const question = await Question.findOneAndDelete({
          _id: questionId,
          questionAuthor: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { questions: question._id } },
          { new: true }
        );

        return question;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // add answer
    addAnswer: async (parent, { questionId, answerText }, context) => {
      if (context.user.username === "admin") {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $addToSet: {
              answers: { answerText },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in as admin!");
    },

    // remove answer
    removeAnswer: async (parent, { questionId, answerId }, context) => {
      if (context.user.username === "admin") {
        return Question.findOneAndUpdate(
          { _id: questionId },
          {
            $pull: {
              answers: { _id: answerId },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in as admin!");
    },
  },
};

module.exports = resolvers;
