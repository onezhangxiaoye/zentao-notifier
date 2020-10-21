const {searchAllProject} = require('../data/queryData');

searchAllProject().then(res => {
    for (const re of res) {
        console.log(`id：${re.id}----name：${re.name}`);
    }
})
