const sequelize = require('sequelize')

const connection = new sequelize('plataforma-perguntas-respostas-node', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection