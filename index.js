const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogPost = require('./models/blogPost');

const app = new express();

mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');  

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async(req, res) => {
    const blogPostEntries = await blogPost.find({});
    res.render('index', {blogPosts: blogPostEntries});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/post/:id', async (req, res) => {
    const blogpostEntry = await blogPost.findById(req.params.id);
    res.render('post', {blogPost: blogpostEntry});
})

app.get('/post/new', (req, res) => {
    res.render('create');
})

app.post('/post/new', async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).send('Title and body are required.');
    }
    await blogPost.create(req.body);
    res.redirect('/'); 
})

