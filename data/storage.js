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
            console.log('ok.');
        }
    });
}



module.exports = {
    getLastBugIdInStorage,
    setLastBugIdInStorage,
}
