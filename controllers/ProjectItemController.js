const ProjectItem = require('../models/ProjectItem');
const Project = require('../models/Project');

module.exports = class ProjectItemController {

    // Cria um novo ProjectItem
    static async createProjectItem(req, res) {
        try {
            const { name, custo, description, projectId } = req.body;

            if (!name || !projectId) {
                return res.status(400).send('Name and projectId are required');
            }

            const newProjectItem = await ProjectItem.create({
                name,
                custo,
                description,
                ProjectId: projectId // associando com o ID do projeto
            });

            res.status(201).json(newProjectItem);
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
}