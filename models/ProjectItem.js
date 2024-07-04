const { DataTypes } = require('sequelize')
const db = require('../db/connection')
const Project = require('./Project')

const ProjectItem = db.define('ProjectItem', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    custo: {
        type: DataTypes.DECIMAL
    },
    description: {
        type: DataTypes.STRING
    }
})

ProjectItem.belongsTo(Project, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Project.hasMany(ProjectItem)

module.exports = ProjectItem