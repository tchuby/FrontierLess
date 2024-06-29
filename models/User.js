const { DataTypes } = require('sequelize')

const db = require('../db/connection')

const User = {
    name: {
        type: DataTypes.STRING,
        required: false
    },
    passWord: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: false
    },
    bithday: {
        type: DataTypes.DATE,
        allowNull: true
    }
}