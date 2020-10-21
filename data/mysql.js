const mysql = require('mysql');
const {mysqlConfig} = require('../notifier.config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('数据库连接成功');
});

module.exports = {connection};
