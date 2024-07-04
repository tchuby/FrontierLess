const Project = require('../models/Project')
const User = require('../models/User')

module.exports = class ProfileController {

    static async showProfile(req, res) {

        const userid = req.params.id;
        console.log(`User ID: ${userid}`); // Log do ID do usuário para verificar

        if (!userid) {
            return res.status(400).send('User ID is required');
        }

        try {
            
            const user = await User.findOne({ raw: true, where: { id: userid } });
            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log(user);

            const projects = await Project.findAll({ raw: true, where: { UserId: userid } });
            console.log(projects);

            res.render('profile/profile', { user: user, projects: projects });

        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async profilePost(req, res) {
        
        const newProfile = req.body

        try{

            const createdProject = await Project.create(newProfile)

        }catch (error) {
            req.flash('message', 'Erro ao criar projeto.')
            res.render('profile/profile')
            console.log(err)
        }
    }

}