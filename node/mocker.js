const fs = require('fs');

const makeDir = require('./utils/makeDir').makeMocksDir
//
makeDir('./mocks');
makeDir('./schemas');
//
//
// let schema = {
//     name: 'Mike',
//     age: 23,
//     gender: 'Male',
//     department: 'English',
//     car: 'Foo'
// };
//
// let data = JSON.stringify(schema);
// fs.writeFileSync('./mocks/student-2.json', data);

const express = require('express');
require('dotenv/config');
const app = express();
app.use(express.json());

// Routes
// const postRoutes = require('./routes/posts');
// app.use('/api/posts', postRoutes);


function getFiles(path, callback){
    fs.readdir(path, (err, files) => {
        const parsedFiles = files.map((file, index) => ({id: index, name: file.split('.')[0]}))
        callback(parsedFiles)
    });
}

app.use(express.static('./scripts'));

app.get('/', (req, res) => {
    fs.readFile('./index.html', function (err, html) {
        res.write(html);
        res.end();
    });

});

app.post('/api/addSchema', (req, res) => {
    console.log(req.body);

    const raw = JSON.stringify(req.body);
    const data = JSON.parse(raw);

    const fileName = data.fileName;
    const fileContent = JSON.parse(data.value)

    // console.log(data);

    fs.writeFileSync(`./schemas/${fileName}.json`, JSON.stringify(fileContent));
    res.send(JSON.stringify(req.body));
});

app.get('/api/getSchemaFiles', (req, res)=>{
    getFiles('./schemas', (files)=>{
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