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

// app.use("/", express.static(__dirname + "/client/build/index.html"));
app.use("/", express.static("./client/build"));

// Conecting with DB

const url =
  "mongodb+srv://admin:admin@cluster0.rushh.mongodb.net/ReviewRest?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("connected to mongoDB"));

// api routes

app.use("/api/user", require("./routes/user"));
app.use("/api/restaurant", require("./routes/restaurant"));
app.use("/api/review", require("./routes/review"));
app.use("/api/reviewReply", require("./routes/reviewReply"));

app.use("/uploads/restaurants", express.static("./uploads/restaurants"));

// listening to server

app.listen(port, () => console.log("Server is running on port: " + port));
