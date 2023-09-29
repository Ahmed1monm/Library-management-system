import User from "../models/User.js";
import UserType from "../models/UserType.js";

/**
 * @async
 * @description list users 
 * @param  {int} user_type - user role
 * @param  {int} offset - pag. offset
 * @param  {int} count - pag. limit
 */
export const getUsers = async (user_type, offset, count)=>{
    const users = await User.findAll({
      include: [
        {
          model: UserType,
          attributes: ["id", "name"],
        },
      ],
      where: { usertypeId: user_type },
      limit: count,
      offset: offset,
    });
    return users;
}

/**
 * @async
 * @description count users
 * @param  {int} user_type - user role
 */
export const countUsers = async (user_type)=>{
    const count = await User.count({ where: { usertypeId: user_type } });
    return count;
}

/**
 * @async
 * @description find user
 * @param  {int} id - user id
 */
export const findUserById = async (id)=>{
    const user = await User.count({ where: { id } });
    return user;
}

/**
 * @async
 * @description update user data
 * @param  {int} id - user id
 * @param  {data} id - user data
 */
export const updateOneUser = async (id, data)=>{
    const user = await User.update( data, { where: { id } } );
    return user;
}

/**
 * @async
 * @description delete user
 * @param  {int} id - user id
 */
export const deleteOneUser = async (id)=>{
    const user = await User.destroy({ where: { id } });
    return user;
}