const express = require("express");
const { db } = require("./src/models/index");
const {errorHandler} = require("./src/middleware/error.middleware");
const router = require("./src/routers/index");
const {PORT,SESSION_SECRET} = require("./src/config/env.config");
const session = require('express-session');
const passport = require("passport");
const initPassport = require("./src/utils/passport.utils");


initPassport(passport);
const app = express();
app.use(express.json());
app.use(session({
  secret:SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", router);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
  db.authenticate();
  db.sync();
});
