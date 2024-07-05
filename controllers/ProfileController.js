const Project = require('../models/Project')
const User = require('../models/User')

module.exports = class ProfileController {

    static async showProfile(req, res) {

        const userProfile = await User.findOne({where: {id: req.session.userid}})

        const userProjects = Project.findAll({where: {UserId: req.session.userid}})
        console.log(userProjects)

        res.render(`profile/profile`, {userProfile, userProjects})

    }

    static async createProject(req, res) {
        const project = {
            destination: req.body.destination,
            publicationDate: req.body.publicationDate,
            status: 'progredindo',
            exchangeType: req.body.exchangeType,
            UserId: req.session.userid
        }

        await Project.create(project)

        res.redirect(`/profile/${req.session.userid}`)
    }

}