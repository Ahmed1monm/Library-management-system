import { countUserTypes,truncateUserTypes, insertUserTypes } from "../services/usertypes.services.js";

/*
    creates the system user types when init the app
*/
export const initUsertypes =async ()=>{
    const userTypesCount = await countUserTypes();
    if ( userTypesCount === 3) return;
    await truncateUserTypes(); 
    await insertUserTypes();
}