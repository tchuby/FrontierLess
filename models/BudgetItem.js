const { DataTypes } = require('sequelize')
const db = require('../db/connection')
const Project = require('./Project')

const BudgetItem = db.define('BudgetItem', {
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

BudgetItem.belongsTo(Project, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Project.hasMany(BudgetItem)

module.exports = BudgetItem