const { DataTypes } = require('sequelize')

const db = require('../db/connection')

const User = db.define('User', {
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
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports  = User