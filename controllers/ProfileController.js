const Project = require('../models/Project');
const User = require('../models/User');

module.exports = class ProfileController {

    static async showProfile(req, res) {
        try {
            const userProfile = await User.findOne({ 
                where: { id: req.session.userid },
                raw: true 
            });

            if (!userProfile) {
                return res.status(404).send('User not found');
            }

            const userProjects = await Project.findAll({ 
                where: { UserId: req.session.userid }, 
                raw: true 
            });

            // Retorna o perfil do usuário e os projetos em um objeto JSON
            return res.status(200).send({ userProfile, userProjects });

        } catch (error) {
            console.error(error);
            return res.status(500).send('Server Error');
        }
    }

    static async createProject(req, res) {
        try {
            const project = {
                destination: req.body.destination,
                status: req.body.status,
                exchangeType: req.body.exchangeType,
                UserId: req.session.userid
            };

            await Project.create(project);

            // Retornar o novo projeto criado com um status 201
            return res.status(201).send('Projeto criado com sucesso');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao criar projeto');
        }
    }
}
