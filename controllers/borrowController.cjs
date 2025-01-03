const Book = require("../models/Book.cjs");
const Borrow = require("../models/Borrow.cjs");

exports.borrowBook = async (req, res) => {
    const { username, bookid } = req.body;
    const book = await Book.findById(bookid);
    if (!book || !book.available) {
        return res.status(400).send("Book not available");
    }
    const borrow = new Borrow({ username, bookid });
    await borrow.save();
    book.available = false;
    await book.save();
    res.status(200).send("Book Borrowed");
};
