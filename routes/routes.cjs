const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/userController.cjs");
const bookController = require("../controllers/bookController.cjs");

// User Routes
router.post("/register", userController.registerUser); //ok*admin
router.post("/login", userController.loginUser); //ok
router.get("/users", userController.getAllUsers); //ok

// Book Routes
router.get("/books", bookController.getBooks); //ok
router.post("/books", bookController.createBook); //ok
router.put("/books/:id", bookController.updateBook); //ok

// Borrow Routes
router.post("/borrow", bookController.borrowBook);

// Return Routes
router.post("/return", bookController.returnBook);

// Export the router
module.exports = router;
