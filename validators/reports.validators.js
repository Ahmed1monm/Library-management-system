import { query } from "express-validator";

import validationMiddelware from "../middlewares/validator.js";

export const CSVReportValidator = [
    query("startDate")
        .notEmpty()
            .withMessage("startDate is required")
        .isDate()
            .withMessage("invalid date format in key endDate"),
    query("endDate")
        .notEmpty()
            .withMessage("endDate is required")
        .isDate()
            .withMessage("invalid date format in key endDate"),
    validationMiddelware
  ];

export const paginationValidator = [
    query("page")
        .notEmpty()
            .withMessage("pagination data is required. page is required")
        .isInt()
            .withMessage("send integer data in key page"),
    query("count")
        .notEmpty()
            .withMessage("pagination data is required. count is required")
        .isInt()
            .withMessage("send integer data in key count"),

    validationMiddelware
  ];
