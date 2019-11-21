const express = require('express');
const cors = require('cors');

let nextId = 1;

const posts = [
    {
        id: nextId++,
        content: 'Первый пост',
        type: 'Обычный',
        likes: 0,
    },
    {
        id: nextId++,
        content: 'Второй пост уже с изображением',
        type: 'Изображение',
        likes: 0,
    }
    ,
    {
        id: nextId++,
        content: 'Аудио',
        type: 'Аудио',
        likes: 0,
    }

]

const server = express();

server.use(express.json());
server.use(cors());

server.get('/posts', (req, res) => {
    res.send(posts);
});

server.delete('/posts/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        res.status(404);
        res.send('There is no such post');
        return;
    }
    posts.splice(index, 1);
    res.send(posts);
})

server.post('/posts/like/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex(post => post.id === id);
    posts[index].likes++;
    res.send(posts);
})

server.delete('/posts/dislike/:id', (req, res) => {
    const id = +req.params['id'];
    const index = posts.findIndex(post =>  post.id === id);
    posts[index].likes--;
    res.send(posts);
})

server.post('/posts', (req, res) => {
    posts.push({
        id: nextId++,
        content: req.body.content,
        likes: 0,
        type: req.body.type
    })
    res.send(posts);
})

server.listen(process.env.PORT || '9999');