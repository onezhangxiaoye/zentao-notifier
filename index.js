const notifier = require('node-notifier');
const {getAllActiveBugs, getNewBugs} = require('./data/queryData');
const {getLastBugIdInStorage, setLastBugIdInStorage} = require('./data/storage');
const {zentao} = require('./notifier.config.js');

let lastBugId = 0;

function setLastBugId (id) {
    id = +id;
    if(!lastBugId || id > lastBugId){
        lastBugId = id;
        setLastBugIdInStorage(id);
    }
}

function getNewBugsByTimeout(){
    setTimeout(() => {
        getNewBugs(lastBugId).then(res => {
            if(res.length > 0){
                setLastBugId(res[res.length - 1].id)
                for (const item of res) {
                    let title = item.assignedTo === zentao.account ? '当前有直接指派给你的BUG' : '您关注的项目有新的BUG啦';
                    notifier.notify({
                        title: title,
                        message: item.title
                    });
                }
            }else{
                console.log('恭喜你，未查询到新增的BUG！');
            }
            getNewBugsByTimeout();
        })
    }, zentao.timeout);
}

getLastBugIdInStorage().then(res => {
    //缓存id
    lastBugId = +res;

    getAllActiveBugs().then(results => {

        setLastBugId(results[results.length - 1].id);

        //直接指派给自己的bug
        let myBugs = results.filter(v => v.assignedTo === zentao.account);

        //新增的BUG
        let newBugs = results.filter(v => v.id > lastBugId);

        notifier.notify({
            title: '项目BUG统计',
            message: `项目剩余${results.length}个BUG，直接指派给你的BUG有${myBugs.length}个，新增BUG数量${newBugs.length}个`
        });

        //开启循环 查询数据库检查新增BUG
        getNewBugsByTimeout();
    });
})
