import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db/index.js";
// routers
import authRouter from "./routes/auth.js";
import userTypeRouter from "./routes/user_types.js";

// import Subspecialization from "./models/subspecialization.js";
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

app.use("/api/auth", authRouter);

const PORT = process.env.PORT

const FORCESYNC = false;

sequelize.sync({ force: FORCESYNC }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
});