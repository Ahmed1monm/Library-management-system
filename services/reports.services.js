import Book from "../models/Book.js";
import User from "../models/User.js";
import BorrowingProcess from "../models/BorrowingProcess.js";
import sequelize from "../config/database.js";
import { Op, QueryTypes } from "sequelize";

/**
 * @async
 * @description list over due borrowing processes
 * @param  {int} offset - paggination offset
 * @param  {int} count - paggination limit
 */
export const getOverdueBooks = async (offset, count)=>{
    const today = new Date();

    const books = await BorrowingProcess.findAll({
        attributes: ["dueTo", ["date", "borrowind_date"]],
        include: [
            {
                model: User,
            attributes: ["id", ["name", "borrower"]],
            },
            {
                model: Book,
                attributes: ["id","title","ISBN"],
            },
        ],
        where: {     
            dueTo : { [Op.lt]: today},
            isReturned: 0
        },
      limit: count,
      offset: offset,
    });
    return books;
}

/**
 * @async
 * @description count over due borrowing processes
 */
export const countOverdueBooks = async ()=>{
    const today = new Date();

    const count = await BorrowingProcess.count({
        where: {     
            dueTo: { [Op.lt]: today},
            isReturned: 0
        },
    });
    return count;
}

/**
 * @async
 * @description list borrowing processes that been made lat month
 */
export const getlastMonthBorrowings = async ()=>{
    const [rows, metadata] = await sequelize.query(
        `
    SELECT 
        "bp"."dueTo" AS due_to,
        "bp"."date" AS borrowing_date,
        "u"."name",
        "b"."title" AS book,
        "author"."name" AS author_name,
        CASE
            WHEN "bp"."isReturned" = 1 THEN 'Returned'
            WHEN "bp"."isReturned" = 0 THEN 'Not Returned'
            ELSE 'Unknown'
        END AS status
    FROM "borrowing_processes" AS "bp"
    JOIN "users" AS "u" ON "u"."id" = "bp"."userId"
    JOIN "books" AS "b" ON "b"."id" = "bp"."bookId"
    JOIN "users" AS "author" ON "b"."userId" = "author"."id"
    WHERE 
        EXTRACT(YEAR FROM "date") = EXTRACT(YEAR FROM NOW() - INTERVAL '1 month')
        AND EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM NOW() - INTERVAL '1 month');
        `
    )
    return rows;
}

/**
 * @async
 * @description list borrowing processes in specific time
 * @param  {data} startDate - start date limit
 * @param  {data} endDate - end date limit
 */
export const borrowingProcess = async (startDate, endDate)=>{
    const rows = await sequelize.query(
        `
        SELECT 
            "bp"."dueTo" AS due_to,
            "bp"."date" AS borrowing_date,
            "u"."name",
            "b"."title" AS book,
            "author"."name" AS author_name,
            CASE
                WHEN "bp"."isReturned" = 1 THEN 'Returned'
                WHEN "bp"."isReturned" = 0 THEN 'Not Returned'
                ELSE 'Unknown'
            END AS status
        FROM "borrowing_processes" AS "bp"
        JOIN "users" AS "u" ON "u"."id" = "bp"."userId"
        JOIN "books" AS "b" ON "b"."id" = "bp"."bookId"
        JOIN "users" AS "author" ON "b"."userId" = "author"."id"
        WHERE 
            bp."date" >= :startDate
            AND bp."date" <= :endDate;
    `,
        {
            replacements: { startDate, endDate },
            type: QueryTypes.SELECT,
        }
      );
    return rows;
}


