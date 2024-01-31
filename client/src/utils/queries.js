import { gql } from "@apollo/client";

// Get logged in user's details
export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      userIcon
      comments {
        _id
        commentText
        commentAuthor
        authorIcon
        commentedBook
        createdAt
        replies {
          _id
          replyText
          replyAuthor
          authorIcon
          createdAt
        }
      }
      questions {
        _id
        questionText
        questionAuthor
        authorIcon
        createdAt
        answers {
          _id
          answerText
          answerAuthor
          createdAt
        }
      }
    }
  }
`;

// Get comments for a specific book
export const GET_COMMENTS = gql`
  query GetComments($commentedBook: String!) {
    comments(commentedBook: $commentedBook) {
      _id
      commentText
      commentAuthor
      authorIcon
      commentedBook
      createdAt
      replies {
        _id
        replyText
        replyAuthor
        authorIcon
        createdAt
      }
    }
  }
`;

// Get a single comment by its ID
export const GET_COMMENT = gql`
  query GetComment($commentId: ID!) {
    comment(commentId: $commentId) {
      _id
      commentText
      commentAuthor
      authorIcon
      commentedBook
      createdAt
      replies {
        _id
        replyText
        replyAuthor
        authorIcon
        createdAt
      }
    }
  }
`;

// Fetch all questions
export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      _id
      questionText
      questionAuthor
      authorIcon
      createdAt
      answers {
        _id
        answerText
        answerAuthor
        createdAt
      }
    }
  }
`;

// Fetch a single question by its ID
export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    question(questionId: $questionId) {
      _id
      questionText
      questionAuthor
      authorIcon
      createdAt
      answers {
        _id
        answerText
        answerAuthor
        createdAt
      }
    }
  }
`;
