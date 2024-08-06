import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { blogPostModel } from './models/blogPost.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import newPostController from './controllers/newPost.js';

const app = new express();

mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');  

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

const validationMiddleware = (req, res, next) => {
    const { title, body } = req.body;
    const { image }  = req.files || '';
    if (!title || !body || !image) {
        // return res.status(400).send('Title, body and image are required.');
        return res.redirect('/post/new'); 
    }
    next();
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/post/create', validationMiddleware);

app.get('/', async(req, res) => {
    const blogPostEntries = await blogPostModel.find({});
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

app.get('/post/new', newPostController);

app.post('/post/create', async (req, res) => {
    const { title, body } = req.body;
    const { image } = req.files;
    const pathToUpload = path.resolve(__dirname,'public/img',image.name);
    await image.mv(pathToUpload, async(error) => {
        if (error) {
            return res.status(400).send(`The image can't be upload. Error: ${error}`)
        }
        await blogPostModel.create({title, body, userName: 'maria', image: `/img/${image.name}`});
    });
    res.redirect('/'); 
})

app.get('/post/:id', async (req, res) => {
    if (req.params.id) {
        const blogpostEntry = await blogPostModel.findById(req.params.id);
        return res.render('post', {blogPost: blogpostEntry});
    }
    return es.render('post');
})

