const mongoose = require("mongoose");
const Book = require("./models/Book");

const MONGO_URI = "mongodb://localhost:27017/library";

const seedBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    publishedDate: "1925-04-10",
    pageCount: 180,
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    publishedDate: "1949-06-08",
    pageCount: 328,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    publishedDate: "1960-07-11",
    pageCount: 281,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    publishedDate: "1813-01-28",
    pageCount: 279,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    publishedDate: "1937-09-21",
    pageCount: 310,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");

    await Book.deleteMany({});
    console.log("Existing data cleared");

    await Book.insertMany(seedBooks);
    console.log("Seed data inserted");

    mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error seeding database:", err.message);
    mongoose.connection.close();
  }
}

seedDatabase();
