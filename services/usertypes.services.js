import UserType from "../models/UserType.js";

/**
 * @async
 * @description count records in user types 
 */
export const countUserTypes = async ()=>{
    const count = await UserType.count({});
    return count;
}

/**
 * @async
 * @description empty user types table
 */
export const truncateUserTypes = async ()=>{
    const affetctedRows = await UserType.destroy({ where: {}});
    return affetctedRows;
}

/**
 * @async
 * @description create user types data
 */
export const insertUserTypes = async ()=>{
    const types = await UserType.bulkCreate([
        {id: 0, name: "Admin"},
        {id: 1, name: "Author"},
        {id: 2, name: "Borrower"},
    ]);
    return types;
}