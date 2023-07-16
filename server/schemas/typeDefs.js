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
    comments: [Comment]
    comment(_id: ID!): Comment
    questions: [Question]
    question(_id: ID!): Question
  }
`;
