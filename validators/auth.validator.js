import { body } from "express-validator";
import validationMiddelware from "../middlewares/validator.js";

export const loginValidator = [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    validationMiddelware
  ];

export const registerValidator = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("user_type").isInt().withMessage("user type: should be the id of the user type, Author = 1, Borrower = 2"),
    validationMiddelware
  ];