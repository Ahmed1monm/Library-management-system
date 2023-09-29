import Book from "../models/Book.js";
import User from "../models/User.js";
import BorrowingProcess from "../models/BorrowingProcess.js";
import sequelize from "../config/database.js";
import { Op, Sequelize } from "sequelize";

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
