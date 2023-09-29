import Book from "../models/Book.js";
import User from "../models/User.js";
import BorrowingProcess from "../models/BorrowingProcess.js";
import sequelize from "../config/database.js";
import { Op, QueryTypes } from "sequelize";

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

export const getlastMonthBorrowings = async (offset, count)=>{
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


