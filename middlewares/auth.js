import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json("You are not authenticated!");
  }
  accessToken = accessToken.split(" ")[1];
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (!user) {
      return res.status(401).json("You are not authenticated!");
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: `invalid token,  ${error}`,
      });
  }
};

export const checkIsAdmin = async (req, res, next) =>{
  if (req.user.user_type !== 3){
    return res.status(401).json("You are not authorized!");
  }
  next();
}