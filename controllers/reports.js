import { 
    getOverdueBooks,
    countOverdueBooks
 } from "../services/reports.services.js";


export const overdueBooks = async (req, res) => {
  try {
    const { page = 1, count = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(count);

    const books = await getOverdueBooks(offset, count);
    const booksCount = await countOverdueBooks();

    return res.status(200).json({ data: books, total: booksCount, page: parseInt(page) });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

