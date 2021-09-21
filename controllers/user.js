const db = require("../utils/db");
const User = db.User;
const Review = db.Review;
const Restaurant = db.Restaurant;
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../utils/passportConfig")(passport);

module.exports = {
  getAll,
  login,
  signUp,
  getById,
  checkAuth,
  loggedIn,
  logout,
  edit,
  _delete,
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

async function edit(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 200, user });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function _delete(req, res) {
  try {
    if (await Review.findOne({ user: req.params.id })) {
      res.json({ status: 200, message: "Delete Review First!" });
    } else if (await Restaurant.findOne({ owner: req.params.id })) {
      res.json({ status: 200, message: "Delete Restaurant First!" });
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.json({ status: 200, message: "Deleted successfully!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: "Authenctication Failed" });
  }
}

async function loggedIn(req, res) {
  res.json({ status: 200, user: req.user });
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
          res.send(user);
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function logout(req, res, next) {
  try {
    req.logOut();
    res.status(200).send("Logout successfully");
  } catch (err) {
    res.status(500).json(err);
  }
}
