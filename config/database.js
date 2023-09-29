import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Library", "postgres", "password", {
  dialect: "postgres",
  host: "postgres",
});

export default sequelize;
