const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    comments: [Comment]!
    questions: [Question]!
    orders: [Order]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    commentedBook: String
    createdAt: String
    replies: [Reply]!
  }

  type Reply {
    _id: ID
    replyText: String
    replyAuthor: String
    createdAt: String
  }

  type Question {
    _id: ID
    questionText: String
    questionAuthor: String
    createdAt: String
    answers: [Answer]!
  }

  type Answer {
    _id: ID
    answerText: String
    answerAuthor: String
    createdAt: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    products: [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    me: User
    comments(commentedBook: String!): [Comment]
    comment(commentId: ID!): Comment
    questions: [Question]
    question(questionId: ID!): Question
  }

  input UserDetails {
    username: String
    email: String
    password: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    updateUser(username: String, email: String, password: String): User
    addComment(commentText: String!): Comment
    removeComment(commentId: ID!): Comment
    addReply(commentId: ID!, replyText: String!): Comment
    removeReply(commentId: ID!, replyId: ID!): Comment
    addQuestion(questionText: String!): Question
    removeQuestion(questionId: ID!): Question
    addAnswer(questionId: ID!, answerText: String!): Question
    removeAnswer(questionId: ID!, answerId: ID!): Question
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
