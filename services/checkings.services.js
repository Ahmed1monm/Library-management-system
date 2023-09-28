import CheckingProcess from "../models/CheckingProcess.js";

export const insertOneChecking = async (data)=>{
    const checking = await CheckingProcess.create( data );
    return checking;
}
