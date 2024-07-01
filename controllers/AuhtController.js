const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        
        const {email, password} = req.body

        //find user

        const user = await User.findOne({where: {email: email}})
        if(!user) {
            req.flash('message', 'Credenciais inválidas')
            res.render('auth/login')
            
            return
        }

        //password matches?
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Credenciais inválidas')
            res.render('auth/login')
            
            return
        }

        //inicializar sessão
        req.session.userid = user.id

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static logout(req, res) {
        req.session.destroy()
        console.log('session killed')
        res.redirect('/')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost (req, res) {
        const {name, email, password, confirmpassword, birthdate} = req.body

        if(password != confirmpassword) {
            req.flash('message', 'Confirmação de senha inválida.')
            res.render('auth/register')
            
            return
        }

        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists) {
            req.flash('message', 'Email já cadastrado.')
            res.render('auth/register')
            
            return
        }

        //criar senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
            birthdate
        }

        try{
            
            const createdUser = await User.create(user)

            //inicializar sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso.')

            req.session.save(() => {
                res.redirect('/')
            })

        }catch (err) {
            req.flash('message', 'Erro ao cadastrar usuário.')
            res.render('auth/register')
            console.log(err)
        }

    }

}