const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./User");
const Project = require("./Project");

const Notification = db.define(
  "Notification",
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Notification, { foreignKey: "userId" });
Project.hasMany(Notification, { foreignKey: "projectId" });

module.exports = Notification;
