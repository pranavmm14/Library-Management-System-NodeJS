const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController.cjs');
const bookController = require('../controllers/bookController.cjs');
const borrowController = require('../controllers/borrowController.cjs');
const returnController = require('../controllers/returnController.cjs');

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);

// Book Routes
router.get('/books', bookController.getBooks);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);

// Borrow Routes
router.post('/borrow', borrowController.borrowBook);

// Return Routes
router.post('/return', returnController.returnBook);

// Export the router
module.exports = router;
