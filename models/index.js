var mysqlAdapter = require('sails-mysql');
var Waterline = require('waterline');

var orm = new Waterline();

var config = {
    adapters: {
        mysql: mysqlAdapter
    },

    connections: {
        localMysql: {
            adapter: 'mysql',
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'menu'
        }
    }
};

var fs = require('fs');
var path = require("path");

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = require(path.join(__dirname, file));
        orm.loadCollection(model);
    });

module.exports = {
    waterline: orm,
    config: config
};