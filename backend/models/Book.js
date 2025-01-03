const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  publishedDate: { type: Date },
  pageCount: { type: String },
  genre: { type: String, default: "unknown" },
});

module.exports = mongoose.model("Book", bookSchema);
