const Sequelize = require ('sequelize');

const conn = new Sequelize('brdata', 'sga', '123', {
    host: '127.0.0.1',
    dialect: 'mysql'
});
module.exports = conn;
