const User = require('../models/User')
const Project = require('../models/Project')
const Review = require('../models/Review')

module.exports = class ReviewController {
    
    static async getReview (req, res) {
        try{
            const { id } = req.params;
    
            const review = await Review.findOne({ where : {id} });
    
            if(!review){
                return res.status(404).send('Review not found.')
            };
    
            req.session.save(()=> {
                return res.status(200).send(projectItem);
            });

        } catch(error){
            console.error(`Erro ao buscar avaliação: ${error}`)
            return res.status(500).send('Server error.')
        }
    }

    static async create (req, res) {
        try{
            const user = await User.findOne({
                where: { id: req.session.userid },
                raw: true,
            })

            if(!user){
                return res.status(400).send('Usuário não encontrado.');
            }

            const newReview = await Review.create({
                grade: req.body.grade,
                description: req.body.description,
                UserId: user.id,
                ProjectId: req.body.ProjectId,
            })
            console.log(newReview)

            req.session.save(() => {
                res.redirect(`/project/${req.body.ProjectId}`)
            });

        }catch (err){

            console.error(err)
            res.status(500).send('Server Error')

        }
    }

    static async showEdit (req, res){
        const userId = req.session.userId
        const reviewId = req.params.id

        const review = await Review.findOne({
            where: { id: reviewId },
            raw: true
        })
        console.log(review)

        req.session.save(() => {
            res.render(`review/edit`, { userId, review });
        })
    }

    static async edit (req, res) {
        const id = req.body.id;

        const updatedReview = {
            grade: req.body.grade,
            description: req.body.description,
        };

        try {

            await Review.update(updatedReview, { where: { id: id } });
            
            req.session.save(() => {
                res.redirect(`/project/${req.body.ProjectId}`);
            })

        } catch (err) {
            console.log('Erro ao atualizar avaliação: ' + err);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async remove (req, res) {
        const id = req.body.id
        const projectId = req.body.ProjectId

        console.log('Id do !!!!!PROJECT!!!!! --- ' + projectId)

        try {

            await Review.destroy({ where: { id: id } })
            
            req.session.save(() => {
                res.redirect(`/project/${projectId}`)
            })

        } catch (err) {

            console.log(`Erro ao excluir o projeto: ${err}`)
            res.status(500).send('Erro interno do servidor')

        }
    }
}