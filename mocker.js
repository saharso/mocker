console.log('haudy');
const fs = require('fs');

// const makeMocksDir = require('./utils/makeDir').makeMocksDir
//
// makeMocksDir('./mocks');
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

const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
app.use(express.json());

// Routes
// const postRoutes = require('./routes/posts');
// app.use('/api/posts', postRoutes);

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
]
app.get('/', (req, res) => {
    fs.readFile('./index.html', function (err, html) {
        res.write(html);
        res.end();
    });

});

app.post('/api', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

const port = 1010;
app.listen(port, ()=> console.log(`listening on port ${port}...`));