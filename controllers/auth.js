import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password, usertypeId } = req.body;
    const existedUser = await User.findOne({where: {username}});
    if(existedUser){
      res.status(400).json({message: "username already existed"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, username, email, password: hashedPassword, usertypeId});
    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        usertypeId
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({error});
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "wrong password" });
    }
    
    const token = jwt.sign( 
      { id: user.id, username: user.username }, 
      process.env.SECRET_KEY,
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};