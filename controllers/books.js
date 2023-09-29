import { 
    getBooks,
    countBooks, 
    createOneBook, 
    deleteOneBook, 
    findBookById, 
    updateOneBook, 
 } from "../services/books.services.js";
import { 
    createBorrowingProccess, 
    getBorrowingProccess, 
    setBorrowingProccessReturned,
    getUserBooks } from "../services/borrowing.services.js";
import { insertOneChecking } from "../services/checkings.services.js";

/**
 * @async
 * @description create book
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, quantity, location } = req.body;
    const book = await createOneBook({ title, userId: author, ISBN, quantity, location });
    return res
            .status(201)
            .json({ message: "book created successfully", data: book });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

/**
 * @async
 * @description update book by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
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

/**
 * @async
 * @description delete book by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await findBookById(id);
    // check if the book exists
    if(!book) return res.status(404).json({ message: "book not found" });
    const affectedRow = await deleteOneBook(id);
    return res
            .status(200)
            .json({message: "book deleted successfully", affectedRow });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

/**
 * @async
 * @description get book and make checking record
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    // insert checking process if book checked by borrower.
    // Author and Admin checkings not
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

/**
 * @async
 * @description list all books
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
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

/**
 * @async
 * @description borrow book
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueTo } = req.body;
    const  userId  = req.user.id;

    const book = await findBookById(id);
    // check if the book exists and available
    if(!book) return res.status(404).json({ message: "Book not found" });
    if(book.quantity < 1) return res.status(400).json({ message: "Book out of stock" });

    const borrowingProcess = await createBorrowingProccess({userId, bookId: id, dueTo});
    // decrement the quantity
    await updateOneBook(id ,{quantity: book.quantity - 1}); 

    return res.status(201).json({ data: borrowingProcess, message: "Borrowing process succeed" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

/**
 * @async
 * @description return book to lib.
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const  userId  = req.user.id;
  
    const borrowingProcess = await getBorrowingProccess(id, userId);
    if(!borrowingProcess) return res.status(404).json({ message: "Borrowing process not found or already returned"});
    const book = await findBookById(id);
    // set borrowing process as returned and increament available quantity of the book
    await setBorrowingProccessReturned(borrowingProcess.id)
    await updateOneBook(id ,{quantity: book.quantity + 1});

    return res.status(200).json({ message: "Borrowing process succeed" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

/**
 * @async
 * @description make user books he has
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const getMyBooks = async (req, res) => {
  try {
    const userId  = req.user.id;
    const books = await getUserBooks(userId)
    return res.status(200).json({ message: "books received successfully", data: books });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};