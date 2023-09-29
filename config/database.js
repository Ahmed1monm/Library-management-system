import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE, 
  "postgres", 
  process.env.POSTGRES_PASSWORD, 
  {
  dialect: "postgres",
  host:process.env.POSTGRES_HOST,
});

export default sequelize;
