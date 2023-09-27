import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const UserType = sequelize.define(
  "usertype",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);

export default UserType;
