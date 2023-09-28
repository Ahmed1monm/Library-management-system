import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";

// routes
import routers from "./routes/index.js";
// database models
import User from "./models/User.js";
import UserType from "./models/UserType.js";
import Book from "./models/Book.js";
import BorrowingProcess from "./models/BorrowingProcess.js";
import CheckingProcess from "./models/CheckingProcess.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use("/v1", routers);

// -------------- Relations -----------------
// user to usertype => one to many
UserType.hasMany(User);
User.belongsTo(UserType);

// user to book => one to many. each book has one author (user of type author)
User.hasMany(Book);
Book.belongsTo(User);

// check to borrower => one to noe. user of type borrower
User.hasOne(CheckingProcess);
CheckingProcess.belongsTo(User);

// check to book => one to noe. 
Book.hasOne(CheckingProcess);
CheckingProcess.belongsTo(Book);

// bottowingProcess to borrower => one to noe. user of type borrower
User.hasOne(BorrowingProcess);
BorrowingProcess.belongsTo(User);

// bottowingProcess to book => one to noe. 
Book.hasOne(BorrowingProcess);
BorrowingProcess.belongsTo(Book);

const PORT = process.env.PORT

const FORCESYNC = false;

sequelize.sync({ force: FORCESYNC }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
});