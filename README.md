# FrontierLess
Repositódio do projeto 
https://github.com/tchuby/FrontierLess

Para rodar a aplicação é preciso ter instalado o Node e o npm 
na máquina;

Como iniciar a aplicação localmente:

#1 - Criar um banco de dados MySql com o nome de: frontierless

#2 - No arquivo db/connection.js conferir se as credenciais do
banco conferem:

const sequelize = new Sequelize('frontierless', 'root', '****', {
    host: 'localhost',
    dialect: 'mysql'
})

o terceiro parâmetro, '****' é a senha de acesso ao banco local, por 
padrão é criada vazia, '', mas se tiver colocado senha é nes-
se campo onde preenche-se a senha.

#3 - Abrir a pasta do repo no VS Code;

#4 - Abrir o teminal na pasta root do projeto;

#5 - Dê o comando: npm start;

#6 - Observe os logs no teminal, se tudo der certo aparecerá no
final a mensagem 'Aplicação rodando';

#7 - abra o navegador no endereço http://localhost:3000/
    #7.1 se a porta estiver ocupada altere a constante
    const port = 3000, para outro número e acesse o local
    host nesta porta;
