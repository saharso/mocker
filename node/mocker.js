const fs = require('fs');
require('dotenv/config');

const getFiles = require('./utils/getFiles').getFiles;
const makeDir = require('./utils/makeDir').makeMocksDir;

const express = require('express');

makeDir('./mocks/lists');
makeDir('./mocks/schemas');

const app = express();

app.use(express.json());

// all static files in 'scripts' directory available to server
app.use(express.static('./scripts'));

// serve the "index.html" file
app.get('/', (req, res) => {
    fs.readFile('./index.html', function (err, html) {
        res.write(html);
        res.end();
    });

});


app.post('/api/addSchema', (req, res) => {
    const raw = JSON.stringify(req.body);
    const data = JSON.parse(raw);
    const fileName = data.fileName;
    const fileContent = JSON.parse(data.value)

    if(!fileName) {
        return res.status(400).send({
            error: 'Please add file name'
        });
    } else {
        fs.writeFileSync(`./mocks/schemas/${fileName}.json`, JSON.stringify(fileContent));
        res.send(JSON.stringify(req.body));
    }

});

app.get('/api/getSchemaFiles', (req, res)=>{
    getFiles('./mocks/schemas', (files)=>{
        res.send(JSON.stringify(files));
    })
});
app.get('/api/getSchemaFile/:id',(req,res)=>{
    const buffer = fs.readFileSync(`./schemas/${req.params.id}.json`);
    console.log(buffer.toString())
    res.send(JSON.stringify(buffer.toString()));
})

const port = 1010;
app.listen(port, ()=> console.log(`listening on port ${port}...`));