import { getBooks, countBooks, createOneBook, deleteOneBook, findBookById, updateOneBook } from "../services/books.services.js";
import { insertOneChecking } from "../services/checkings.services.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, quantity, location } = req.body;
    const book = await createOneBook({ title, userId: author, ISBN, quantity, location });
    return res
            .status(200)
            .json({ message: "book created successfully", data: book });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, ISBN, quantity, location } = req.body;
    const oldBook = await findBookById(id);
    if(!oldBook) return res.status(404).json({ message: "book not found" });
    const book = await updateOneBook(id, { title, author, ISBN, quantity, location });
    return res
            .status(200)
            .json({ message: "book updated successfully", affected_rows: book.length === 1 ? book[0] : book });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await findBookById(id);
    if(!book) return res.status(404).json({ message: "book not found" });
    const affectedRow = await deleteOneBook(id);
    return res
            .status(200)
            .json({message: "book deleted successfully", affectedRow });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    if(user.usertypeId === 2) await insertOneChecking({ userId: user.id, bookId: id })
    const book = await findBookById(id);
    if(!book) return res.status(404).json({ message: "book not found" });
    return res
            .status(200)
            .json({message: "success", book, user });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

export const listBooks = async (req, res) => {
  try {
    const { page = 1, count = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(count);

    const books = await getBooks(offset, count);
    const booksCount = await countBooks();
    return res.status(200).json({ data: books, total: booksCount, page });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};