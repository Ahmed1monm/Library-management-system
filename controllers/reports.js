import { 
    getOverdueBooks,
    countOverdueBooks,
    getlastMonthBorrowings,
    borrowingProcess
 } from "../services/reports.services.js";
import { exportCSV } from "../utils/attachments.js";

/**
 * @async
 * @description over due borrowings
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
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

/**
 * @async
 * @description reporting borrowings of last month
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const lastMonthBorrowings = async (req, res) => {
  try {
    
    const borrowings = await getlastMonthBorrowings();
    return res.status(200).json({ data: borrowings });

  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

/**
 * @async
 * @description reporting borrowing processes and export it in CSV file
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export const borrowingProcessReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const report = await borrowingProcess(startDate, endDate);
    // check if report returns empty data
    if(report.length === 0) return res.status(400).json({ message: "This report contains empty data" })
    const file = exportCSV(report);
    const fullPath = `${req.host}:${process.env.PORT}${file}`

    return res.status(200).json({ data: report, file: fullPath });

  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

