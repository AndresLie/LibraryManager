const express = require("express");
const bookController = require("../controller/bookController");

const router = express.Router();

router.post("/book", bookController.createBook);
router.get("/books", bookController.getAllBooks);
router.get("/book/:id", bookController.getBookById);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

module.exports = router;
