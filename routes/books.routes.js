import express from "express";

import {
    createBook,
    deleteBook,
    listBooks, 
    updateBook,
    getBook,
    borrowBook,
    returnBook
} from "../controllers/books.js";
import { auth } from "../middlewares/auth.js";
import { createBookValidator, updateBookValidator } from "../validators/books.validator.js";

const router = express.Router();

router.route("/")
        .get(auth, listBooks)
        .post(auth, createBookValidator, createBook)
router.route("/:id")
        .get(auth, getBook)
        .delete(auth, deleteBook)
        .put(auth, updateBookValidator, updateBook)

router.route("/:id/borrow")
        .post(auth, borrowBook)
router.route("/:id/return")
        .post(auth, returnBook)
  
export default router;
