const notifier = require('node-notifier');
const {getAllActiveBugs, getLastBugId} = require('./data/queryData');
const {getLastBugIdInStorage, setLastBugIdInStorage} = require('./data/storage');

let lastBugId = null;

getLastBugIdInStorage().then(res => {
    lastBugId = +res;
    console.log('lastBugId:', res);

    getAllActiveBugs().then(results => {
        let myBugs = results.filter(v => v.assignedTo === 'yuehm');
        // notifier.notify({
        //     title: '项目BUG统计',
        //     message: `项目剩余${results.length}个BUG，直接指派给你的BUG有${myBugs.length}个`
        // });
    });


    getLastBugId().then(res => {
        console.log(res[0].id)
    })



})
