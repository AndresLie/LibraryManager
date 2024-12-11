const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mongo Db
mongoose
  .connect("mongodb://localhost:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* Routes */

// Create/Add  book
app.post("/api/book", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating book", error: err.message });
  }
});

// Read all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
});

// Read a book by ID
app.get("/api/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: err.message });
  }
});

// Update a book by ID
app.put("/api/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating book", error: err.message });
  }
});

// Delete a book by ID
app.delete("/api/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
