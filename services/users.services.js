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
      where: { usertypeId: user_type },
      limit: count,
      offset: offset,
    });
    return users;
}

export const countUsers = async (user_type)=>{
    const count = await User.count({ where: { usertypeId: user_type } });
    return count;
}

export const findUserById = async (id)=>{
    const user = await User.count({ where: { id } });
    return user;
}

export const updateOneUser = async (id, data)=>{
    const user = await User.update( data, { where: { id } } );
    return user;
}

export const deleteOneUser = async (id)=>{
    const user = await User.destroy({ where: { id } });
    return user;
}