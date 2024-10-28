const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const User = require('../models/User')
const Project = require('../models/Project')

const UserFollowProject = db.define('UserFollowProject', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Configurar as relações
// Configurar as relações
User.belongsToMany(Project, { as: 'FollowedProjects', through: UserFollowProject, foreignKey: 'userId' });
Project.belongsToMany(User, { as: 'Followers', through: UserFollowProject, foreignKey: 'projectId' });

module.exports = UserFollowProject;