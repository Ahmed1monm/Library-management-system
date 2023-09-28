import User from "../models/User.js";
import { getUsers, countUsers, findUserById } from "../services/users.services.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, email } = req.body;

    const oldUser = await findUserById(id);

    if(!oldUser) return res.status(404).json({ message: "user not found" });

    const user = await User.update( { username, password, name, email }, { where: { id: id } } );

    res.status(200).json({
      message: "user updated successfully",
      affected_rows: user.length === 1 ? user[0] : user,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id);

    if(!user) return res.status(404).json({ message: "user not found" });

    const affectedRow = await User.destroy({ where: { id: id } });

    res.status(200).json({
      message: "user deleted successfully",
      affectedRow,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { page = 1, count = 10, type } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(count);

    const users = await getUsers(type, offset, count);
    const usersCount = await countUsers(type);

    res.status(200).json({ data: users, total: usersCount });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};




