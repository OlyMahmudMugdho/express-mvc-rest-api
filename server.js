const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const corsOptions = ['*','https://example.com'];

const corsConfig = {
    origin: (origin, callback) => {
        if (corsOptions[0] === '*' || corsOptions.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Blocked by me"));
        }
    }
};


app.use(cors(corsConfig));
app.use('/posts', require('./api/posts'));
app.use('/posts', require('./api/posts'));
app.use('/posts/:id', require('./api/posts'));

app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));

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

