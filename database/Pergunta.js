//MODEL para salvar pergunta no banco de dados MYSQL
const Sequelize = require("sequelize");
const conn = require("./database")

const Pergunta = conn.define('c001_pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false,

    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},{});

//Cria o banco e as tabelas e force: false nao força a criação da tabela novamente
Pergunta.sync({force: false}).then(() => {/*console.log('Criação da tabela completa')*/});

module.exports = Pergunta;
