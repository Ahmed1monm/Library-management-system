import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Library", "postgres", "01151875214", {
  dialect: "postgres",
  host: "localhost",
});

export default sequelize;
