const { DataTypes } = require('sequelize')
const db = require('../db/connection')
const User = require('./User')

const Project = db.define('Project', {
    destination: {
        type: DataTypes.STRING,
        required: false
    },
    publicationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM,
        values: ['progredindo', 'hiato', 'finalizado', 'abandonado'],
        allowNull: false,
        defaultValue: 'progredindo' // Opcional: define um valor padrão
    },
    exchangeType: {
        type: DataTypes.ENUM,
        values: ['idioma', 'escola', 'faculdade', 'pós-graduação', 'pesquisa'],
        allowNull: true
    }
})

Project.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

User.hasMany(Project)

module.exports = Project