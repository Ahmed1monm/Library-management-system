import User from "../models/user.js";
import sequelize from "../db/index.js";
import UserType from "../models/user_type.js";
import { Op } from "sequelize";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      username,
      password,
      user_type_id,
      specialty_id,
      government_id,
      phone,
      phone2,
      address,
      region,
      register_number,
      is_active,
      subspeciality
    } = req.body;
    const image = req.file_path;
    // return res.status(201).json({is_active})

    let oldUser = await User.findOne({ where: { id: id } });
    let clinc_id = oldUser.clinc_id;

    const user = await User.update(
      {
        name,
        username,
        password,
        user_type_id,
        specialty_id,
        clinc_id,
        phone,
        phone2,
        address,
        image,
        is_active,
        subspeciality
      },

      { where: { id: id } }
    );

    res.status(200).json({
      message: "user updated successfully",
      affected_rows: user.length === 1 ? user[0] : user,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const updateAssistantUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const currentUser = req.user;
    const user = await User.update(
      {
        ...data,
        expired_at: currentUser.expired_at,
        is_active: currentUser.is_active,
        clinc_id: currentUser.clinc_id,
        responsible_doctor: currentUser.id,
      },
      { where: { id: id } }
    );

    res.status(200).json({
      message: "user updated successfully",
      affected_rows: user.length === 1 ? user[0] : user,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      user_type_id,
      specialty_id,
      government_id,
      phone,
      phone2,
      address,
      region,
      register_number,
      is_active,
      subspeciality
    } = req.body;
    const point = { type: 'Point', coordinates: [33.312805, 44.361488]};
    if (user_type_id == 4) {
      const user = await User.create({
        name,
        username,
        password,
        user_type_id,
        specialty_id,
        clinc_id: clinic.id,
        phone,
        phone2,
        address,
        image,
        is_active,
        subspeciality
      });

      res.status(200).json({
        message: "user created successfully",
        user,
      });
    } else {
      const user = await User.create({
        name,
        username,
        password,
        user_type_id,
        specialty_id,
        clinc_id: clinic.id,
        phone,
        phone2,
        address,
        image,
        is_active,
        subspeciality
      });

      res.status(200).json({
        message: "user created successfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id: id } });

    res.status(user === 0 ? 404 : 200).json({
      message: user === 0 ? "User not found" : "user deleted successfully",
      affected_rows: user.length === 1 ? user[0] : user,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "User data",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const getAssistantUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      attributes: ["id", "name", "username", "phone", "address"],
      include: [
        {
          model: UserType,
          attributes: ["id", "name"],
        },
      ],

      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "User data ",
      user,
    });
  } catch (err) {
    res.status(400).json({ message: `error ${err}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page, perPage, name = "", type = "", speciality = "" } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(perPage);
    const users = await User.findAll({
      attributes: ["id", "name", "username","image","expired_at","is_active"],
      include: [
        {
          model: UserType,
          attributes: ["id", "name"],
        },
      ],
      // sersh by name or username or type or speciality or clinic if exist
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            user_type_id: {
              [Op.like]: `%${type}%`,
            },
          }
        ],
      },
      limit: parseInt(perPage),
      offset: offset,
    });

    const usersCount = await User.findAll({
      attributes: ["id"],
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            username: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            user_type_id: {
              [Op.like]: `%${type}%`,
            },
          },
          {
            specialty_id: {
              [Op.like]: `%${speciality}%`,
            },
          },
        ],
      },
    });

    res.status(200).json({
      message: "All users data",
      users: {
        data: users,
        total: usersCount.length,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};



export const getUserTypes = async (req, res) => {
  try {
    const { page = 1, perPage = 100 } = req.query;
    const offset = (page - 1) * perPage;
    const [users, metadata] = await sequelize.query(`
    SELECT id, name FROM usertypes
    ORDER BY id DESC
  `);

    const [usersCount, metadata2] = await sequelize.query(`
    SELECT COUNT(id) AS count
    FROM usertypes
    `);

    res.status(200).json({
      message: "user types data",
      users: {
        data: users,
        total: usersCount[0].count,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};


