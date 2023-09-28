import { USER_TYPES } from "../config/constants.js";
import { getUsers, countUsers, findUserById, updateOneUser, deleteOneUser } from "../services/users.services.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, email } = req.body;
    const oldUser = await findUserById(id);
    if(!oldUser) return res.status(404).json({ message: "user not found" });
    const user = await updateOneUser(id, { username, password, name, email });
    return res
            .status(200)
            .json({ message: "user updated successfully", affected_rows: user.length === 1 ? user[0] : user });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if(!user) return res.status(404).json({ message: "user not found" });
    const affectedRow = await deleteOneUser(id);
    return res
            .status(200)
            .json({message: "user deleted successfully", affectedRow });
  } catch (error) {
    return res.status(500).json({ message: `error ${error}` });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { page = 1, count = 10, type } = req.query;
    if(!USER_TYPES[type]) return res.status(404).json({ message: "This user type doesn't exist" });
    const offset = (parseInt(page) - 1) * parseInt(count);
    const users = await getUsers(type, offset, count);
    const usersCount = await countUsers(type);
    return res.status(200).json({ data: users, total: usersCount });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};