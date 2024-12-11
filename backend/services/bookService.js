const Book = require("../models/Book");

exports.createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

exports.getAllBooks = async () => {
  return await Book.find({}, { title: 1, author: 1 });
};

exports.getBookById = async (id) => {
  return await Book.findById(id);
};

exports.updateBook = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};
