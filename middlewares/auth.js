import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json("You are not authenticated!");
  }
  accessToken = accessToken.split(" ")[1];
  try {
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (!accessToken || !validToken) {
      return res.status(401).json("You are not authenticated!");
    }
    req.user = validToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: `invalid token,  ${error.toString()}  \n${accessToken}`,
      });
  }
};
