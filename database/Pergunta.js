const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})

Pergunta.sync({ force: false })
        .then(() => {
          console.log('O model foi criado com sucesso!')
        })
        .catch((erro) => {
          console.log(`Deu ruim na criação do model: ${erro}`)
        })

module.exports = Pergunta