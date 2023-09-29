import Book from "../models/Book.js";
import BorrowingProcess from "../models/BorrowingProcess.js";
import User from "../models/User.js";


export const createBorrowingProccess = async (data)=>{
    const book = await BorrowingProcess.create(data);
    return book;
}

export const getBorrowingProccess = async (bookId, userId)=>{
    const borrowingProcess = await BorrowingProcess.findOne({where: { bookId, userId, isReturned: 0 }});
    return borrowingProcess;
}

export const setBorrowingProccessReturned = async (id)=>{
    const borrowingProcess = await BorrowingProcess.update({ isReturned: 1 },{where: { id }});
    return borrowingProcess;
}

export const getUserBooks = async (id)=>{
    const books = await BorrowingProcess.
        findAll({
            where: { userId: id, isReturned: 0 },
            attributes: [["date", "borrowing_date"], ["dueTo", "due_to"]],
            include: [
                {
                    model: Book,
                    attributes: ["title","ISBN"],
                    include: [
                        {
                            model: User,
                            attributes: [["name", "author"]]
                        }
                    ]
                }
            ]
        })
    return books;
}