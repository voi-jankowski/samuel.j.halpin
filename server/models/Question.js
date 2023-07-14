const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: "The question has to have some content!",
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  questionAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // creat a helper function to format the date using the dateFormat() function we created in the /utils folder
  },
  answers: [
    {
      answerText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // creat a helper function to format the date using the dateFormat() function we created in the /utils folder
      },
    },
  ],
});

const Question = model("Question", thoughtSchema);

module.exports = Question;
