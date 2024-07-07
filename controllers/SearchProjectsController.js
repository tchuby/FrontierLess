const Project = require('../models/Project')
const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = class SearchProjectController {

    static async showSearchProjects(req, res) {

        let search = req.query.search ? req.query.search : ''
        
        const projectsData = await Project.findAll({
            include: User,
            where: {
                destination: { [Op.like]: `%${search}%`}
            }
        })
        
        const projects = projectsData.map((result) => result.get({ plain: true }))

        res.render('searchProjects/searchProjects', { projects, search })

    }

}