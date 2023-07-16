const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Question, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51NUJK2AfEwsDyM4I9JDGzRlXlYALqglL2SRBqVUKT01R4ucQFbCvmY255kiREGNkbAtwyIwKUjETnNZTNzAYwEsX00rcl9jbwl"
);

const resolvers = {};

module.exports = resolvers;
