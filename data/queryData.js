
const {connection} = require('./mysql');
const {zentao} = require('../notifier.config.js');

const project = zentao.projectId.map(v => `project = ${v}`).join(' OR ');

function getMyBugs(sql) {
    return new Promise(((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            resolve(results);
        });
    }))
}

function getAllActiveBugs() {
    return getMyBugs(`SELECT id,title,assignedTo FROM zt_bug WHERE (${project}) AND status = "active";`);
}
function getNewBugs(id) {
    return getMyBugs(`SELECT id,title,assignedTo FROM zt_bug WHERE (${project}) AND status = "active" AND id > ${id};`);
}

function getLastBugId() {
    return getMyBugs('SELECT id FROM zt_bug ORDER BY id DESC limit 1;');
}

function searchAllUser() {
    return getMyBugs('SELECT account,realname FROM zt_user;');
}

function searchAllProject() {
    return getMyBugs('SELECT id,name FROM zt_project;');
}

module.exports = {
    getLastBugId,
    getAllActiveBugs,
    getNewBugs,
    searchAllUser,
    searchAllProject,
}
