const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

////////////////////////////////////////
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send("user singout");
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Email does not exites" });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({ error: "Email and password do not match" });
    }
    ///////////create token /////////////
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token to cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send responce to frontend//
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signup = (req, res) => {
  ///handle validation error/////
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  //////////////////

  ////creating user and saving to db////////////
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user",
      });
    }
    res.json({ name: user.name, email: user.email, id: user._id });
  });
};

exports.isSignIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      erroe: "Not an ADMIN",
    });
  }

  next();
};
