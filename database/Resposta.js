const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('respostas', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false, 
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

Resposta.sync({ force: false })
        .then(() => {
          console.log('O model de Respostas foi criado com sucesso!')
        })
        .catch((erro) => {
          console.log(`Deu ruim na criação do model: ${erro}`)
        })

module.exports = Resposta