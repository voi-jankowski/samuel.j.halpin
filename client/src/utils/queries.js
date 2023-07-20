import { gql } from "@apollo/client";

// Fetch all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

// Fetch a single product by its ID
export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(_id: $productId) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

// Fetch user's order by its ID
export const GET_ORDER = gql`
  query GetOrder($orderId: ID!) {
    order(_id: $orderId) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;

// Get checkout session
export const GET_CHECKOUT_SESSION = gql`
  query GetCheckoutSession($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

// Get logged in user's details
export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      comments {
        _id
        commentText
        commentAuthor
        commentedBook
        createdAt
        replies {
          _id
          replyText
          replyAuthor
          createdAt
        }
      }
      questions {
        _id
        questionText
        questionAuthor
        createdAt
        answers {
          _id
          answerText
          answerAuthor
          createdAt
        }
      }
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          image
          price
          quantity
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
      commentedBook
      createdAt
      replies {
        _id
        replyText
        replyAuthor
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
      commentedBook
      createdAt
      replies {
        _id
        replyText
        replyAuthor
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
