import { countUserTypes,truncateUserTypes, insertUserTypes } from "../services/usertypes.services.js";

/*
    creates the system user types when init the app i
    this will happen if the user types doesn't contains the 
    user rules. this will happen when the database container runs for the first time
*/
export const initUsertypes =async ()=>{
    const userTypesCount = await countUserTypes();
    if ( userTypesCount === 3) return;
    await truncateUserTypes(); 
    await insertUserTypes();
}