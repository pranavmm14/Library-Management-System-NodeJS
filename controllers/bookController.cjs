const Book = require("../models/Book.cjs");
const Borrow = require("../models/Borrow.cjs");
const Return = require("../models/Return.cjs");
const User = require("../models/User.cjs");

exports.createBook = async (req, res) => {
    const { name, author, genre } = req.body;
    try {
        const newBook = new Book({ name, author, genre });
        await newBook.save();
        res.status(201).send("Book Created");
    } catch (err) {
        res.status(500).send("Error creating book");
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ available: true });
        res.json(books);
    } catch (err) {
        res.status(500).send("Error fetching books");
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        if (!req.header("Authorization")) {
            return res.status(403).send("Access denied. Admins only.");
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, secretKey); // Use secretKey from config
        const user = await User.findById(decoded.id);

        // Check if the user is an admin
        if (!user || !user.admin) {
            return res.status(403).send("Access denied. Admins only.");
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating book",
            error: error.message,
        });
    }
};


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

exports.returnBook = async (req, res) => {
    const { username, bookid } = req.body;

    // Check if the book has already been returned by the user
    const existingReturnRecord = await Return.findOne({ username, bookid });
    if (existingReturnRecord) {
        return res.status(400).send("This book has already been returned.");
    }

    // Find the borrow record to ensure the user borrowed the book
    const borrowRecord = await Borrow.findOne({ username, bookid });
    if (!borrowRecord) return res.status(400).send("Borrow record not found");

    // Calculate the fine if the book is returned late
    const fine =
        Math.max(
            0,
            (new Date() - borrowRecord.duedate) / (1000 * 60 * 60 * 24)
        ) * 10; // Fine calculation (10 per day late)

    // Create and save a new return record
    const returnRecord = new Return({
        username,
        bookid,
        duedate: borrowRecord.duedate,
        fine,
    });
    await returnRecord.save();

    // Update the book availability
    const book = await Book.findById(bookid);
    book.available = true;
    await book.save();

    res.status(200).send("Book Returned");
};
