const Book = require("../models/Book.cjs");

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
    const { bookId } = req.params; // Book ID from URL parameters
    const updatedData = req.body; // Updated fields from request body

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            updatedData,
            { new: true, runValidators: true } // Options to return the updated book and validate changes
        );

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
