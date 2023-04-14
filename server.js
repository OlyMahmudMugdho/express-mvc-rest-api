const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'views')));


app.use('/posts',require('./api/posts'))


const PORT = process.env.PORT | 5000;


const users = [
    {
        id : 1,
        firstname : 'john',
        lastname : 'doe'
    },
    {
        id : 2,
        firstname : 'foo',
        lastname : 'bar'
    }
];

app.get('/api',(req,res) => {
    res.json(users);
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
} )
.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`)
})

