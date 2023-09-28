import express from "express";

import {
    createBook,
    deleteBook,
    listBooks, 
    updateBook,
    getBook
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
          
  
export default router;
