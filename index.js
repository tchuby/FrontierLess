const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/connection') //conexão com banco
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash') 

//Models
const User = require('./models/User')
const Project = require('./models/Project')
const Review = require('./models/Review')
const ProjectItem = require('./models/ProjectItem')

//import routes
const homeRoutes = require('./routes/homeRoutes')
const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const profileRoutes = require('./routes/profileRoutes')
const searchProjectsRoutes = require('./routes/searchProjectsRoute')
const projectItemRoutes = require('./routes/projectItemRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

//import controller
const HomeController = require('./controllers/HomeController')

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

//public path: css e js
app.use(express.static('public'))

//ler o body de requisições post
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//session middleware, onde a aplicação grava as sessões
app.use(
    session({
        name: "session",
        secret: "_5h56GqS<;O1",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// flash messages, mensagens de status do sistema
app.use(flash())

//Set session to res
app.use((req, res, next) => {
    
    //usuario logado 
    if(req.session.userid) {
        //atribuir os dados do usuario da requisição para a resposta
        res.locals.session = req.session
    }

    //caso não logado passar direto
    next()

})

// -- ROTAS --
app.use('/review', reviewRoutes)
app.use('/project-item', projectItemRoutes)
app.use('/searchProjects', searchProjectsRoutes)
app.use('/profile', profileRoutes)
app.use('/project', projectRoutes)
app.use('/home', homeRoutes)
app.use('/', authRoutes)

app.get('/', HomeController.showHome)

//realizar conexão permanente
conn
    //.sync()
    .sync({ force: true })
    .then(() => {
    // rodar aplicação
    app.listen(port, () => {
        console.log('Aplicação rodando')
    })})
    .catch((err) => console.log(err))
