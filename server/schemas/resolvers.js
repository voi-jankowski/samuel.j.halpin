const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Question, Comment } = require("../models");
const {
  signToken,
  generateResetToken,
  verifyResetToken,
} = require("../utils/auth");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51NUJK2AfEwsDyM4I9JDGzRlXlYALqglL2SRBqVUKT01R4ucQFbCvmY255kiREGNkbAtwyIwKUjETnNZTNzAYwEsX00rcl9jbwl"
);

const resolvers = {
  Query: {
    // get all products
    products: async () => {
      return await Product.find();
    },
    // get a single product by its _id
    product: async (parent, { _id }) => {
      return await Product.findById(_id);
    },
    // get user's order
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
        });
        return user.orders.id(_id);
      }
      throw new AuthenticationError("Not logged in");
    },
    // get the checkout session
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "aud",
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },

    // get me (logged in user)
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate({
            path: "orders.products",
          })
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
    removeUser: async (parent, args, context) => {
      console.log(context.user);
      const user = await User.findByIdAndDelete(context.user._id);
      return user;
    },

    //  update user
    updateUser: async (
      parent,
      { username, email, password, userIcon },
      context
    ) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { username, email, password, userIcon },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },

    // request password reset
    requestPasswordReset: async (parent, { email }) => {
      // find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return user;
      }

      console.log(user);

      // generate a password reset token
      const resetToken = generateResetToken(user);
      console.log(resetToken);

      // send the password reset email
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: "Password Reset",
        text: `Hi ${user.username},\n\nIt seems like you forgot your password for Samuel J. Halpn portal. If this is true, click the link below to reset your password. This link will expire in 1 hour.\n\n
        Reset my password:\n\n${process.env.CLIENT_URL}/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return user;
    },

    // reset password
    resetPassword: async (parent, { token, newPassword }) => {
      // verify the reset token
      const { email } = verifyResetToken(token);

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

    // add order
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { orders: order } },
          { new: true }
        );

        return order;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // update product's quantity
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        { _id },
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
