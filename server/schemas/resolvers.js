const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Question, Comment } = require("../models");
const { signToken } = require("../utils/auth");
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
  },
  Mutation: {},
};

module.exports = resolvers;
