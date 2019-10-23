const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta') // model
const Resposta = require('./database/Resposta')

connection.authenticate()
          .then(() => {
            console.log('Conexão com MySQL realizada com sucesso!')
          })
          .catch((erro) => {
            console.log(`Deu ruim: ${erro}`)
          })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  Pergunta.findAll({ raw: true, order:[ ['id', 'DESC'] ] }) // raw: true (retorna somente os dados do banco)
          .then(perguntas => {
            console.log(perguntas)
            res.render('index', {
              perguntas: perguntas
            })
          })
          .catch((erro) => {
            console.log(`Deu ruim na hora de buscar as perguntas no banco de dados: ${erro}`)
          })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
  const tituloPergunta = req.body.tituloPergunta
  const descricaoPergunta = req.body.descricaoPergunta
  
  Pergunta.create({
    titulo: tituloPergunta,
    descricao: descricaoPergunta,
  })
  .then(() => {
    console.log('Infos salvas com sucesso no banco de dados!')
    res.redirect('/')
  })
  .catch((erro) => {
    console.log(`Deu ruim: ${erro}`)
    res.redirect('/perguntar')
  })
})

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id

  Pergunta.findOne({
    where: {
      id: id
    }
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: {
          perguntaId: pergunta.id
        },
        order: [
          ['id', 'DESC'], 
        ],
      }).then(respostas => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    } else {
      res.redirect('/')
    }
  }).catch((erro) => {
    console.log(`Deu ruim na hora de buscar a pergunta no banco: ${erro}`)
  })
})

app.post('/responder', (req, res) => {
  const corpo = req.body.corpo
  const perguntaId = req.body.perguntaId

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`)
  })
})

app.listen(8080, () => console.log('Servidor rodando na porta 8080'))