
const {connection} = require('./mysql');

function getMyBugs(sql) {
    return new Promise(((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            resolve(results);
        });
    }))
}

function getAllActiveBugs() {
    return getMyBugs('SELECT id,title,assignedTo FROM zt_bug WHERE (project = 36 OR project = 34) AND `status` = "active";');
}

function getLastBugId() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM zt_bug ORDER BY id DESC limit 1;', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
    })
}

module.exports = {
    getLastBugId,
    getAllActiveBugs,
}
