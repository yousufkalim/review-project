const db = require("../utils/db");
const User = db.User;
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../utils/passportConfig")(passport);

module.exports = {
  getAll,
  login,
  signUp,
  getById,
};

async function getAll(req, res) {
  try {
    let users = await User.find();
    res.json({ status: 200, users });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getById(req, res) {
  try {
    let users = await User.findById(req.params.id);
    res.json({ status: 200, users });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function signUp(req, res) {
  try {
    if (await User.findOne({ email: req.body.email })) {
      throw 'Email "' + req.body.email + '" is already taken';
    }
    const user = new User(req.body);

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    await user.save();
    res.json({ status: 200, user });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res, next) {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;

      if (!user) {
        res.send("Invalid email or password");
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).json(err);
  }
}
