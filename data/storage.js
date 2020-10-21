let fs = require('fs');

function getLastBugIdInStorage() {
    return new Promise((resolve, reject) => {
        fs.readFile('storage.txt', 'utf8', (err, data) => {
            resolve(data);
        })
    })
}


function setLastBugIdInStorage(id) {
    fs.writeFile('storage.js', String(id), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`最后一个BUG的id已缓存：${id}`);
        }
    });
}



module.exports = {
    getLastBugIdInStorage,
    setLastBugIdInStorage,
}
