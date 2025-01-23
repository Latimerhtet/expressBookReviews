const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let isUserExist = users.filter((user) => user.username === username);
  return isUserExist.length > 0 ? true : false;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let isUserAuthenticated = users.filter(
    (user) => user.username === username && user.password === password
  );
  return isUserAuthenticated.length > 0 ? true : false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(404).json({ message: "Wrong user credentials!" });
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).json({ message: "User Login successful!" });
  } else {
    return res.status(404).json({ message: "Wrong user credentials!" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
