import { 
    getOverdueBooks,
    countOverdueBooks,
    getlastMonthBorrowings,
    borrowingProcess
 } from "../services/reports.services.js";
import { exportCSV } from "../utils/attachments.js";


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

export const lastMonthBorrowings = async (req, res) => {
  try {
    
    const borrowings = await getlastMonthBorrowings();
    return res.status(200).json({ data: borrowings });

  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

export const borrowingProcessReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const report = await borrowingProcess(startDate, endDate);
    const file = exportCSV(report);
    const fullPath = `${req.host}:${process.env.PORT}${file}`

    return res.status(200).json({ data: report, file: fullPath });

  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

