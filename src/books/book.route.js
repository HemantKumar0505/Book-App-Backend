const express = require('express')
const router = express.Router();
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook,UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');


// frontend => backend server => controller => Book Schema => database => send to server => back to frontend.
// post = when submit somethng frontend to db
// get = when get smething bac from db
// pu/patch = when edit or update something
// delete = when delete something


// post a book
router.post("/create-book",verifyAdminToken,postABook)

// get all books
router.get("/",getAllBooks)

// get a single book
router.get("/:id",getSingleBook)

// update a book
router.put("/edit/:id",verifyAdminToken,UpdateBook)

// delete a book
router.delete("/:id",verifyAdminToken,deleteABook)

module.exports = router;