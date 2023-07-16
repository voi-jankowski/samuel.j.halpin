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
    // get the checkout session
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "aud",
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      }
    },

    // get me (logged in user)
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // get all comments
    comments: async (parent, { commentedBook }) => {
      const params = commentedBook ? { commentedBook } : {};
      return await Comment.find(params)
        .sort({ createdAt: -1 })
        .populate("replies");
    },

    // get a single comment by its _id
    comment: async (parent, { thoughtId }) => {
      return await Comment.findOne({ _id: thoughtId }).populate("replies");
    },

    // get all questions
    questions: async () => {
      return await Question.find().sort({ createdAt: -1 }).populate("answers");
    },

    // get a single question by its _id
    question: async (parent, { questionId }) => {
      return await Question.findOne({ _id: questionId }).populate("answers");
    },
  },

  Mutation: {},
};

module.exports = resolvers;
