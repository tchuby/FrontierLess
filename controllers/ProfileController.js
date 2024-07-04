const Project = require('../models/Project')

module.exports = class ProfileController {

    static showProfile(req, res) {

        res.render('profile/profile')

    }

}