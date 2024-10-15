const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static async loginPost(req, res) {
        const { email, password } = req.body;

        // Encontrar usuário
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(403).send('Credenciais inválidas');
        }

        // Verificar se a senha coincide
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(403).send('Credenciais inválidas');
        }

        // Inicializar sessão
        req.session.userid = user.id;

        req.session.save(() => {
            return res.status(200).send('Login bem-sucedido');
        });
    }

    static logout(req, res) {
        req.session.destroy(() => {
            console.log('Sessão encerrada');
            return res.status(200).send('Logout realizado com sucesso');
        });
    }

    static async registerPost(req, res) {
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
}
