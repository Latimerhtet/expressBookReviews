const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");
public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(422).json({ message: "Invalid username and email" });
  }
  if (isValid(username)) {
    return res.status(422).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User is successfully registered!" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json({ books, message: "All books are available" });
});

// public_users.get("/", async function (req, res) {
//   // Write your code here
//   try {
//     const response = await axios.get("http://example.com/api/books"); // Replace with the actual API endpoint
//     const books = response.data;
//     return res.status(200).json({ books, message: "All books are available" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error fetching books", error: error.message });
//   }
// });

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json({ book, message: "Book available" });
  } else {
    return res.status(404).json({ message: "Book not available" });
  }
});

// public_users.get("/books/:isbn", async function (req, res) {
//   const isbn = req.params.isbn;
//   try {
//     const response = await axios.get(`http://example.com/api/books/${isbn}`); // Replace with the actual API endpoint
//     const book = response.data;
//     return res
//       .status(200)
//       .json({ book, message: "Book details fetched successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error fetching book details", error: error.message });
//   }
// });
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  let desiredBooks = [];
  for (const [key, value] of Object.entries(books)) {
    if (value.author === author) {
      desiredBooks.push(value);
    }
  }
  if (desiredBooks.length === 0) {
    return res.status(404).json({ message: "Book not available" });
  } else {
    return res
      .status(200)
      .json({ message: "Books available", books: desiredBooks });
  }
});

// public_users.get("/author/:author", async function (req, res) {
//   const author = req.params.author;
//   try {
//     const response = await axios.get(
//       `http://example.com/api/books?author=${author}`
//     ); // Replace with the actual API endpoint
//     const books = response.data;
//     if (books.length === 0) {
//       return res.status(404).json({ message: "Books not available" });
//     } else {
//       return res.status(200).json({ message: "Books available", books });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         message: "Error fetching books by author",
//         error: error.message,
//       });
//   }
// });

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  let desiredBooks = [];
  for (const [key, value] of Object.entries(books)) {
    if (value.title === title) {
      desiredBooks.push(value);
    }
  }
  if (desiredBooks.length === 0) {
    return res.status(404).json({ message: "Book not available" });
  } else {
    return res
      .status(200)
      .json({ message: "Books available", books: desiredBooks });
  }
});

// public_users.get("/title/:title", async function (req, res) {
//   const title = req.params.title;
//   try {
//     const response = await axios.get(
//       `http://example.com/api/books?title=${title}`
//     ); // Replace with the actual API endpoint
//     const books = response.data;
//     if (books.length === 0) {
//       return res.status(404).json({ message: "Books not available" });
//     } else {
//       return res.status(200).json({ message: "Books available", books });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error fetching books by title", error: error.message });
//   }
// });
//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res
      .status(200)
      .json({ review: book.reviews, message: "Book available" });
  } else {
    return res.status(404).json({ message: "Book not available" });
  }
});

module.exports.general = public_users;
