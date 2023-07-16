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

    
