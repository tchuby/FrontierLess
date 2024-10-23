const User = require('../models/User')
const bcrypt = require('bcryptjs');


module.exports = class UserController{
    
    static async getUser(req, res) {
        const { id } = req.params;
    
        try {
            const user = await User.findOne({
                where: { id },
                attributes: { exclude: ['password'] } // Exclui a senha dos dados retornados
            });
    
            if (!user) {
                return res.status(404).send('Usuário não encontrado.');
            }
    
            return res.status(200).send(user);
        } catch (err) {
            console.error('Erro ao buscar usuário: ', err);
            return res.status(500).send('Erro ao buscar usuário.');
        }
    }

    static async createUser(req, res) {
        const { name, email, password, confirmpassword, birthdate } = req.body;

        // Verificar se as senhas coincidem
        if (password !== confirmpassword) {
            return res.status(400).send('Confirmação de senha inválida.');
        }

        // Verificar se o usuário já existe
        const checkIfUserExists = await User.findOne({ where: { email: email } });
        if (checkIfUserExists) {
            return res.status(409).send('Email já cadastrado.');
        }

        // Criar senha
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword,
            birthdate
        };

        try {
            const createdUser = await User.create(user);

            // Inicializar sessão
            req.session.userid = createdUser.id;

            return res.status(201).send('Cadastro realizado com sucesso.');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar usuário.');
        }
    }

    static async removeUser(req, res) {
        const id = req.params.id;
        const userId = req.session.userid;
    
        try {
            // Verifica se o usuário tem permissão para remover o próprio perfil
            if (userId != id) {
                return res.status(403).send('Você não tem permissão para remover este usuário.');
            }
    
            await User.destroy({ where: { id } });
    
            // Deslogar o usuário removido
            req.session.destroy();
    
            return res.status(200).send('Usuário removido com sucesso.');
        } catch (err) {
            console.error('Erro ao remover usuário: ', err);
            return res.status(500).send('Erro ao remover usuário.');
        }
    }

    static async updateUser(req, res) {
        const id  = req.params.id;
        const { name, email, birthdate } = req.body;
        const userId = req.session.userid;
    
        try {
            console.log("userId: ",userId," - id: ",id);
            // Verifica se o usuário tem permissão para atualizar o próprio perfil
            if (userId != id) {
                return res.status(403).send('Você não tem permissão para atualizar este usuário.');
            }
    
            // Atualiza apenas os campos permitidos
            const updatedUser = {
                name,
                email,
                birthdate,
            };
    
            await User.update(updatedUser, { where: { id } });
    
            return res.status(200).send('Usuário atualizado com sucesso.');
        } catch (err) {
            console.error('Erro ao atualizar usuário: ', err);
            return res.status(500).send('Erro ao atualizar usuário.');
        }
    }

    static async updatePassword(req, res) {
        const { id, oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.userid;
    
        try {
            // Verifica se o usuário tem permissão para atualizar a própria senha
            if (userId !== id) {
                return res.status(403).send('Você não tem permissão para alterar a senha deste usuário.');
            }
    
            // Verifica se a nova senha e a confirmação coincidem
            if (newPassword !== confirmPassword) {
                return res.status(400).send('Confirmação de senha inválida.');
            }
    
            // Buscar o usuário
            const user = await User.findOne({ where: { id } });
    
            // Verificar se a senha atual está correta
            const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).send('Senha atual inválida.');
            }
    
            // Criar nova senha hash
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
    
            // Atualizar a senha
            await User.update({ password: hashedPassword }, { where: { id } });
    
            return res.status(200).send('Senha atualizada com sucesso.');
        } catch (err) {
            console.error('Erro ao atualizar senha: ', err);
            return res.status(500).send('Erro ao atualizar senha.');
        }
    }

}