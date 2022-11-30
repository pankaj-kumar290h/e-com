const User = require("../models/user");
const { body, validationResult } = require("express-validator");

////////////////////////////////////////
exports.signout = (req, res) => {
  res.send("user singout");
};

exports.signup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

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
