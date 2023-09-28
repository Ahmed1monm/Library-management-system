import BorrowingProcess from "../models/BorrowingProcess.js";


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