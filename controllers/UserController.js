const User = require('../models/User')

module.exports = class UserController{
    
    static showRegisterUser(req, res) {
        res.render('registerUser')
    }
}