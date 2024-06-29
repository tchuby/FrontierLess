const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/connection') //conexão com banco

// -- CONFIGURAÇÕES --

//servidor
const app = express()
const port = 3000

//handlebars
const partialsHbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', partialsHbs.engine)
app.set('view engine', 'handlebars')

//css e js
app.use(express.static('public'))

//ler o body de requisições post
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

// -- ROTAS --
app.get('/perfil', (req,res)=>{
    res.render('perfil')
})

app.get('/user/create', (req, res) => {
    //res.render('criarPerfil')
    res.send('em construção...')
})

app.post('/user/create', (req, res) => {
    const user = req.body
    res.send(`Usuário nome = ${user.name}.`)
    res.send('em construção...')
})

//home, manter esse endpoint sempre abaixo de todos os demais
app.get('/', (req,res)=>{
    res.render('home')
})

// rodar aplicação
app.listen(port, () => {
    console.log('Aplicação rodando')
})
