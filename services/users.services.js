import User from "../models/User.js";
import UserType from "../models/UserType.js";

export const getUsers = async (user_type, offset, count)=>{
    const users = await User.findAll({
      include: [
        {
          model: UserType,
          attributes: ["id", "name"],
        },
      ],
      where: { user_type },
      limit: count,
      offset: offset,
    });
    return users;
}

export const countUsers = async (user_type)=>{
    const count = await User.count({ where: { user_type } });
    return count;
}

export const findUserById = async (id)=>{
    const user = await User.count({ where: { id } });
    return user;
}