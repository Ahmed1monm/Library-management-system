import { query } from "express-validator";

import validationMiddelware from "../middlewares/validator.js";

export const listUsersValidator = [
    query("type")
        .notEmpty()
            .withMessage("type is required")
        .isInt()
            .withMessage("type accepts the type ID, please send integer number"),
    validationMiddelware
  ];
