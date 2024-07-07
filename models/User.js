const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = User;
