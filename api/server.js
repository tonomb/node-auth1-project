const express = require("express");
const server = express();
const session = require("express-session");
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require("./users/userRouter");
const authRouter = require("./auth/authRouter");
const protected = require('./auth/protected')
const dbConnection = require('../data/dbConfig')

const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 10, //after 10 min the cookie expires
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true, //gdpr compliance, the client should drive this
  store: new KnexSessionStore({ //create sessions table in db.
    knex: dbConnection,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60 //delete expired sessions every hour
  })
};

server.use(express.json());
server.use(session(sessionConfig));


server.use("/users", protected, usersRouter);
server.use('/api', authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running on port 5000" });
});

module.exports = server;
