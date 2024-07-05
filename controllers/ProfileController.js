const Project = require('../models/Project')
const User = require('../models/User')

module.exports = class ProfileController {

    static async showProfile(req, res) {

        try {
            const userProfile = await User.findOne({ where: { id: req.session.userid } });

            if (!userProfile) {
                // Tratar o caso onde o usuário não é encontrado
                return res.status(404).send('User not found');
            }

            const userProjects = await Project.findAll({ where: { UserId: req.session.userid }, raw: true });
            console.log(userProjects);

            res.render('profile/profile', { userProfile, userProjects });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
        
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