module.exports = {
  apps: [
    {
      name: "samuel.j.halpin",
      script: "./server/server.js",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        JWT_SECRET: "qaLSJ2UktBdfN4RLK62qtRe0B3bLmsnmj2KjLHswaN8",
        EMAIL_HOST: "smtppro.zoho.com",
        MAIL_USERNAME: "reset@samueljhalpin.com",
        MAIL_PASSWORD: "RoseRed13!",
        CLIENT_URL: "https://samueljhalpin.com",
        MONGODB_URI:
          "mongodb+srv://wojtekwacekdola:ptfaKLN5lrzXNND7@voi-toi.o098veg.mongodb.net/samuel-database?retryWrites=true&w=majority",
      },
    },
  ],
};
