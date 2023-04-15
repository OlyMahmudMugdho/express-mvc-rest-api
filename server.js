const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/posts', require('./api/posts'));
app.use('/posts', require('./api/posts'));
app.use('/posts/:id', require('./api/posts'));

const PORT = process.env.PORT | 5000;


const users = [
    {
        id: 1,
        firstname: 'john',
        lastname: 'doe'
    },
    {
        id: 2,
        firstname: 'foo',
        lastname: 'bar'
    }
];

app.get('/api', (req, res) => {
    console.log(req.body);
    res.json(users);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
    .listen(PORT, (req, res) => {
        console.log(req)
        console.log(`Server running at http://localhost:${PORT}`)
    })

