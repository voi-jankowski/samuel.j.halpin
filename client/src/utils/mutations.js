import { gql } from "@apollo/client";

// Add a user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        userIcon
      }
    }
  }
`;

// Login a user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        userIcon
      }
    }
  }
`;

// Remove a user
export const REMOVE_USER = gql`
  mutation RemoveUser() {
    removeUser() {
      _id
      username
      email
    }
  }
`;

// Update a user
export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      userIcon
    }
  }
`;

// Add a comment
export const ADD_COMMENT = gql`
  mutation AddComment($commentText: String!, $commentedBook: String!) {
    addComment(commentText: $commentText, commentedBook: $commentedBook) {
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

// Remove a comment
export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
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

// Add a reply
export const ADD_REPLY = gql`
  mutation AddReply($commentId: ID!, $replyText: String!) {
    addReply(commentId: $commentId, replyText: $replyText) {
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

// Remove a reply
export const REMOVE_REPLY = gql`
  mutation RemoveReply($commentId: ID!, $replyId: ID!) {
    removeReply(commentId: $commentId, replyId: $replyId) {
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

// Add a question
export const ADD_QUESTION = gql`
  mutation AddQuestion($questionText: String!) {
    addQuestion(questionText: $questionText) {
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

// Remove a question
export const REMOVE_QUESTION = gql`
  mutation RemoveQuestion($questionId: ID!) {
    removeQuestion(questionId: $questionId) {
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

// Add an answer
export const ADD_ANSWER = gql`
  mutation AddAnswer($questionId: ID!, $answerText: String!) {
    addAnswer(questionId: $questionId, answerText: $answerText) {
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

// Remove an answer
export const REMOVE_ANSWER = gql`
  mutation RemoveAnswer($questionId: ID!, $answerId: ID!) {
    removeAnswer(questionId: $questionId, answerId: $answerId) {
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

// Add an order
export const ADD_ORDER = gql`
  mutation AddOrder($products: [ID]!) {
    addOrder(products: $products) {
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

// Update a product's quantity
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($_id: ID!, $quantity: Int!) {
    updateProduct(_id: $_id, quantity: $quantity) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;
