const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// Initializing app and port

const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Conecting with DB

const url =
  "mongodb+srv://admin:admin@cluster0.rushh.mongodb.net/ReviewRest?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("connected to mongoDB"));

// api routes

app.use("/user", require("./routes/user"));
app.use("/restaurant", require("./routes/restaurant"));
// app.use("/review", require("./routes/review"));
// app.use("/reviewReply", require("./routes/reviewReply"));

// listening to server

app.listen(port, () => console.log("Server is running on port: " + port));
