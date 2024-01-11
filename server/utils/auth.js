const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "24h";
const expirationReset = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // generate a password reset token
  generateResetToken: function ({ email, _id }) {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expirationReset });
  },

  // verify the reset token
  verifyResetToken: function (token) {
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expirationReset });
      return data; // return the decoded data (email, username, _id)
    } catch (err) {
      console.log("Invalid token");
      return err.message("Invalid token");
    }
  },
};
