const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('frontierless', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conexão realizada com sucesso.')
}catch(err) {
    console.log('Erro ao tentar conexão com a base de dados.', 
        err)
}

module.exports = sequelize