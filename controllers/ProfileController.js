const Project = require('../models/Project')
const User = require('../models/User')

module.exports = class ProfileController {

    static async showProfile(req, res) {

        try {
            const userProfile = await User.findOne({ 
                where: { id: req.session.userid },
                raw: true 
            });

            
            if (!userProfile) {
                // Tratar o caso onde o usuário não é encontrado
                return res.status(404).send('User not found');
            }
            console.log(userProfile)
            
            
            const userProjects = await Project.findAll({ 
                where: { UserId: req.session.userid }, 
                raw: true
            });
            console.log(userProjects);
    
            req.session.save(() => {
                res.render('profile/profile', { userProfile, userProjects });
            })
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
        
    }

    static async createProject(req, res) {
        const project = {
            destination: req.body.destination,
            status: req.body.status,
            exchangeType: req.body.exchangeType,
            UserId: req.session.userid
        }

        await Project.create(project)

        res.redirect(`/profile/${req.session.userid}`)
    }

}