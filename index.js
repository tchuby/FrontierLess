const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const partialsHbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', partialsHbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//rotas
app.get('/', (req,res)=>{
    
    res.render('home')

})

app.listen(port, () => {
    console.log('application running')
})
