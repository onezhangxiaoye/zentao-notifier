
module.exports = {
    mysqlConfig: {
        host     : '192.168.1.220',
        user     : 'root',
        password : 'root',
        database : 'zentao'
    },
    zentao: {
        account: 'yuehm', //用户名 数据库对应account
        timeout: 1000 * 60 *5, //轮询数据库时间
        projectId: [34, 36], //关联项目id
    }
}
