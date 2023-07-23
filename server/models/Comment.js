const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: "You cannot leave an empty comment!",
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  commentAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  authorIcon: {
    type: String,
  },

  commentedBook: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // creat a helper function to format the date using the dateFormat() function we created in the /utils folder
  },
  replies: [
    {
      replyText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      replyAuthor: {
        type: String,
        required: true,
      },
      authorIcon: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // creat a helper function to format the date using the dateFormat() function we created in the /utils folder
      },
    },
  ],
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
