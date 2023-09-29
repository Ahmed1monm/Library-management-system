import CheckingProcess from "../models/CheckingProcess.js";

/**
 * @async
 * @description insert in database that a book was checked from a user
 * @param  {object} data - checking process data
 */
export const insertOneChecking = async (data)=>{
    const checking = await CheckingProcess.create( data );
    return checking;
}
