const express = require('express');
const mongoose = require('mongoose');

const app = new express();

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

app.set('view engine', 'ejs');  

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
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