const Project = require('../models/Project');
const ProjectItem = require('../models/ProjectItem');
const User = require('../models/User');
const Review = require('../models/Review');

module.exports = class ProjectController {

    static async showProject(req, res) {
        const id = req.params.id;

        try {
            const project = await Project.findOne({
                where: { id: id },
                raw: true
            });
            console.log(project)

            const user = await User.findOne({
                where: { id: project.UserId },
                raw: true
            })
            console.log(user)

            const projectItems = await ProjectItem.findAll({
                where: { ProjectId: project.id },
                raw: true
            })
            console.log(projectItems)
            
            const budget = projectItems.reduce((total, item) => total + parseFloat(item.cost || 0), 0);
            console.log(`R$ ${budget} orçamento do projeto`);

            const reviews = await Review.findAll({
                where: { ProjectId: project.id },
                raw: true
            })
            
            reviews.forEach((review) => {
                if(review.UserId === req.session.userid){
                    review.isMyReview = true
                }
                else{
                    review.isMyReview = false
                }
            })
            console.log(reviews)
            
            const isMyProject = (project.UserId === req.session.userid)

            if (project) {
                req.session.save(() => {
                    res.render('project/project', { project, isMyProject, budget, user, projectItems, reviews });
                });
            } else {
                res.status(404).send('Projeto não encontrado');
            }

        } catch (err) {
            console.error('Erro ao buscar projeto:', err);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static showAddProject(req, res) {
        req.session.save(() => {
            res.render('project/create');
        });
    }

    static async createProject(req, res) {
        const { destination, exchangeType } = req.body;

        const newProject = {
            destination,
            status: 'progredindo',
            exchangeType,
            UserId: req.session.userid
        };

        try {
            await Project.create(newProject);
            req.session.save(() => {
                res.redirect('/profile');
            });
        } catch (err) {
            console.log(err);
            req.flash('message', 'Erro ao cadastrar projeto.');
            res.redirect('/profile');
        }
    }

    static async removeProject(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Project.destroy({ where: { id: id, UserId: UserId } });
            req.session.save(() => {
                res.redirect('/profile');
            });
        } catch (err) {
            console.log(`Erro ao excluir o projeto: ${err}`);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async showUpdateProject(req, res) {
        const id = req.params.id;

        try {
            const project = await Project.findOne({
                where: { id: id },
                raw: true
            });

            if (project) {
                req.session.save(() => {
                    res.render('project/update', { project });
                });
            } else {
                res.status(404).send('Projeto não encontrado');
            }
        } catch (err) {
            console.error('Erro ao buscar projeto:', err);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async updateProject(req, res) {
        const id = req.body.id;

        const updatedProject = {
            destination: req.body.destination,
            exchangeType: req.body.exchangeType,
            status: req.body.status,
        };

        try {
            await Project.update(updatedProject, { where: { id: id } });
            req.session.save(() => {
                res.redirect('/profile');
            });
        } catch (err) {
            console.log('Erro ao atualizar projeto: ' + err);
            res.status(500).send('Erro interno do servidor');
        }
    }
};
