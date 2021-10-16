const fs = require('fs');

function setFileName(file){
    return file.split('.')[0]
}

function getFiles(path, callback){

    fs.readdir(path, (err, files) => {
        const parsedFiles = files.map((file, index) => {
            return {
                id: setFileName(file),
                name: setFileName(file),
            };
        });

        filesToReturn = parsedFiles;
        callback && callback(parsedFiles)
    });

}

module.exports.getFiles = getFiles;
