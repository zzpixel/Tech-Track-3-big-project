const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userSchematic = require("./schema/UserSchema");
require("dotenv").config();
require("dotenv").config({ path: "../frontend/.env" });

const port = process.env.VITE_PORT;

app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERaPASSWORD}@cluster0.27m5ahe.mongodb.net/users`
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(`MongoDB failed to connect: ${error}`));

app.post("/login", (req, res) => {
  const { username, password } = req.body; // Get username and password from Signin request
  userSchematic
    .findOne({ username }) // Find user by username / validate login
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Check if password matches
          res.json("Success");
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("User not found");
      }
    })
    .catch((err) => res.json("Error: " + err));
});

app.get("/user/:username", (req, res) => {
  // Query user data by username and store in response
  const username = req.params.username;
  userSchematic
    .findOne({ username })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json("User not found");
      }
    })
    .catch((err) => res.json("Error: " + err));
});

app.post("/register", (req, res) => {
  const { username } = req.body;

  if (!username || username.includes(" ")) { // Makes sure username is not empty and does not contain spaces
    return res.json("Username cannot be empty or contain spaces");
  }

  userSchematic
    .findOne({ username }) // Check if username already exists
    .then((existingUser) => {
      if (existingUser) {
        return res.json("Username already taken");
      } else {
        return userSchematic
          .create(req.body) // Create new user in MongoDB. Does not hash password, insecure.
          .then((usersData) => res.json(usersData)) // Return created user data as JSON
          .catch((err) => res.json("Error: " + err));
      }
    });
});

app.post("/setpreferences", (req, res) => {
  const { username, likesMovies, likesTV, GenresLiked } = req.body;

  userSchematic
    .findOneAndUpdate(
      { username },
      { likesMovies, likesTV, GenresLiked },
      { new: true }
    )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json("Preferences updated successfully");
      } else {
        res.json("User not found");
      }
    })
    .catch((err) => res.json("Error: " + err));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
