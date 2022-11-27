const Sequelize = require ('sequelize');

const conn = new Sequelize('brdata', 'sga', 'brd@t@', {
    host: '127.0.0.1',
    dialect: 'mysql'
});
module.exports = conn;