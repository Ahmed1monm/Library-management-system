import { body, param } from "express-validator";

import validationMiddelware from "../middlewares/validator.js";
import { USER_TYPES } from "../config/constants.js";

export const createBookValidator = [
    body("ISBN")
        .isInt()
            .withMessage("ISBN is an Integer")
        .isLength({ min: 6 })
            .withMessage("ISBN must be at least 6 characters long"),
    body("author")
        .isInt()
            .withMessage("please enter author ID"),
    body("quantity")
        .isInt({gt: 0})
            .withMessage("quantity must be greater than 0"),

    validationMiddelware
  ];

export const updateBookValidator = [
    param("id")
        .isInt(),
    body("ISBN")
        .optional()
        .isInt()
            .withMessage("ISBN is an Integer")
        .isLength({ min: 6 })
            .withMessage("ISBN must be at least 6 characters long"),
    body("author")
        .optional()
        .isInt()
            .withMessage("please enter author ID"),
    body("quantity")
        .optional()
        .isInt({gt: 0})
            .withMessage("quantity must be greater than 0"),
    validationMiddelware
  ];