const Book = require("../models/Book.cjs");
const Return = require("../models/Return.cjs");
const Borrow = require("../models/Borrow.cjs");

exports.returnBook = async (req, res) => {
    const { username, bookid } = req.body;
    const borrowRecord = await Borrow.findOne({ username, bookid });
    if (!borrowRecord) return res.status(400).send("Borrow record not found");

    const fine =
        Math.max(
            0,
            (new Date() - borrowRecord.duedate) / (1000 * 60 * 60 * 24)
        ) * 10; // Fine calculation
    const returnRecord = new Return({
        username,
        bookid,
        duedate: borrowRecord.duedate,
        fine,
    });
    await returnRecord.save();

    const book = await Book.findById(bookid);
    book.available = true;
    await book.save();

    res.status(200).send("Book Returned");
};
