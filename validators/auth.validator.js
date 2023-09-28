import { body } from "express-validator";

import validationMiddelware from "../middlewares/validator.js";
import { USER_TYPES } from "../config/constants.js";

export const loginValidator = [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    validationMiddelware
  ];

export const registerValidator = [
    body("email")
      .isEmail()
      .withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("usertypeId")
      .isInt()
      .withMessage("user type: should be the id of the user type, Admin = 0, Author = 1, Borrower = 2"),
    validationMiddelware
  ];