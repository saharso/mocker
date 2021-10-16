const fs = require('fs');

function getFiles(path, callback){
    fs.readdir(path, (err, files) => {
        const parsedFiles = files.map((file, index) => ({id: index, name: file.split('.')[0]}))
        callback(parsedFiles)
    });
}

module.exports.getFiles = getFiles;
