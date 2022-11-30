const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

////////////////////////////////////////
exports.signout = (req, res) => {
  res.send("user singout");
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).json({ error: "Email does not exites" });
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
