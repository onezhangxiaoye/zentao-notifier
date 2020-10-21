const {searchAllUser} = require('../data/queryData');
searchAllUser().then(res => {
    for (const re of res) {
        console.log(`realname：${re.realname}----account：${re.account}`);
    }
})
