const User = require('../models/User')

module.exports = class HomeController {

    static showHome(req, res) {
        res.render('home/home')
    }

}