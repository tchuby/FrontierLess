const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const User = require('../models/User')

const UserFollowUser = db.define('UserFollowUser', {
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    followedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = UserFollowUser;