const Project = require('../models/Project')

module.exports = class ProjectController {

    static showProject(req, res) {

       // res.render('project/project')
    }

    static showItems(req, res) {
       // res.render('project/showItem')
    }
    
    static showAddProject(req, res) {

        res.render('project/create')

    }

    static async createProject(req, res){

        const { destination, exchangeType }= req.body

        const newProject = {
            destination,
            status: 'progredindo',
            exchangeType,
            UserId: req.session.userid
        }

        console.log(newProject)

        try{

            await Project.create(newProject)

            res.redirect('/profile')

        }catch (err) {
            console.log(err)
            req.flash('message', 'Erro ao cadastrar usuário.')
            res.render('/profile')
        }
    }

}
