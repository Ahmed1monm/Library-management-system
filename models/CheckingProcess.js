import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CheckingProcess = sequelize.define(
  "checking_process",
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
  },
  {
    timestamps: false,
  }
);

export default CheckingProcess;
