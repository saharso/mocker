
function makeMocksDir(dirName){
    const fs = require('fs');

    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
}
module.exports.makeMocksDir = makeMocksDir;