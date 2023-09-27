import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, user_type, clinc_id, specialty_id, name } =
      req.body;
    const newUser = await User.create({
      username,
      password,
      user_type,
      clinc_id,
      specialty_id,
      name,
    });
    // create token
    const accessToken = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        expired_at: newUser.expired_at,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Specialty,
          attributes: ["id", "name"],
        },
        {
          model: UserType,
          attributes: ["id", "name"],
        },
      ],
    });


    if (!user) {
      return res.status(401).json({ message: "المستخدم غير موجود" });
    }

    if (user.password != password) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }
    
    // expire
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
        clinc_id: user.clinc_id,
        specialty_id: user.specialty_id,
        user_type: user.user_type_id,
        speciality: user.speciality,
        address: user.address,
        phone: user.phone,
        phone2: user.phone2,
        doctor: user.responsible_doctor,
        type: user.usertype,
        register_number: clinc ? clinc.register_number : null,
        subspecialization: user.subspeciality,
        is_active: user.is_active,
        expired_at: user.expired_at,
        image: user.image
      },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({ accessToken, permissions });
  } catch (error) {
    return res.status(500).json({error: `error is ${error}`});
  }
};

export const verify = (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json("You are not authenticated!");
  }
  try {
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = validToken;
    if (validToken) {
      return res.status(200).json({ validToken });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `invalid token,  ${error.toString()}` });
  }
};

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "name", "phone", "address", "image"],
      where: {
        id: req.user.id,
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

export const updateMe = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const image = req.file_path;
    const user = await User.update(
      {
        name,
        phone,
        address,
        image
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.status(200).json({
      message: "User data ",
      user,
    });
  } catch (err) {
    res.status(400).json({ message: `error ${err}` });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        id,
        password: oldPassword,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    await User.update(
      {
        password: newPassword,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      message: "تم تغيير كلمة المرور بنجاح",
    });
  } catch (err) {
    res.status(400).json({ message: `error ${err}` });
  }
};
