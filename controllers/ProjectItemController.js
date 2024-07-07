const ProjectItem = require('../models/ProjectItem');
const Project = require('../models/Project');

module.exports = class ProjectItemController {

    static showCreate(req, res) {
        const projectId = req.params.projectId

        req.session.save(() => {
            res.render('project-item/create', { projectId });
        });
    }

    // Cria um novo ProjectItem
    static async createProjectItem(req, res) {
        try {
            const projectItem = req.body;
            console.log(projectItem)

            if (!projectItem.name || !projectItem.ProjectId) {
                return res.status(400).send('Name and projectId are required');
            }

            const newProjectItem = await ProjectItem.create({
                name: projectItem.name,
                cost: projectItem.cost,
                description: projectItem.description,
                ProjectId: projectItem.ProjectId // associando com o ID do projeto
            });

            req.session.save(() => {
                res.redirect(`/project/${projectItem.ProjectId}`);
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Encontra um ProjectItem por ID
    static async findOne(req, res) {
        try {
            const { id } = req.params;

            const projectItem = await ProjectItem.findOne({ where: { id } });

            if (!projectItem) {
                return res.status(404).send('ProjectItem not found');
            }

            res.status(200).json(projectItem);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Encontra todos os ProjectItems filtrados por Project
    static async findAllByProject(req, res) {
        try {
            const { projectId } = req.params;

            const projectItems = await ProjectItem.findAll({
                where: { ProjectId: projectId },
                raw: true
            });

            if (!projectItems || projectItems.length === 0) {
                return res.status(404).send('No ProjectItems found for the given project');
            }

            res.status(200).json(projectItems);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    static async remove(req, res) {
        const id = req.body.id;

        try {
            await ProjectItem.destroy({ where: { id: id } });

            req.session.save(() => {
                res.redirect(`/project/${req.body.projectId}`);
            });
        } catch (err) {
            console.log(`Erro ao excluir o projeto: ${err}`);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async showEdit(req, res){
        const id = req.params.id;

        try {
            const projectItem = await ProjectItem.findOne({
                where: { id: id },
                raw: true
            });

            if (projectItem) {
                req.session.save(() => {
                    res.render('project-item/update', { projectItem });
                });
            } else {
                res.status(404).send('Item não encontrado');
            }
        } catch (err) {
            console.error('Erro ao buscar projeto:', err);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async edit(req, res){
        const id = req.body.id;

        const updatedProjectItem = {
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
        };

        try {
            await ProjectItem.update(updatedProjectItem, { where: { id: id } });
            req.session.save(() => {
                res.redirect(`/project/${req.body.ProjectId}`);
            });
        } catch (err) {
            console.log('Erro ao atualizar item do projeto: ' + err);
            res.status(500).send('Erro interno do servidor');
        }
    }
}