import UserType from "../models/UserType.js";

export const countUserTypes = async ()=>{
    const count = await UserType.count({});
    return count;
}

export const truncateUserTypes = async ()=>{
    const affetctedRows = await UserType.destroy({ where: {}});
    return affetctedRows;
}

export const insertUserTypes = async ()=>{
    const types = await UserType.bulkCreate([
        {id: 0, name: "Admin"},
        {id: 1, name: "Author"},
        {id: 2, name: "Borrower"},
    ]);
    return types;
}