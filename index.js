global.loggedIn = null;

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { newBlogPost, createNewBlogPost, findAll, 
    aboutController, contactController, 
    findById, newUser, register, login, 
    loginUser} from './controllers/index.js';
import { validationMiddleware, authMiddleware, redirectIfAuthenticatedMiddleware } from './middlewares/index.js';    
import session from 'express-session';


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
app.use(fileUpload());
app.use('/post/create', validationMiddleware);
app.use(session({
    secret: 'MariaRules',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.get('/', findAll);

app.get('/about', aboutController);

app.get('/contact', contactController);

app.get('/post/new', authMiddleware, newBlogPost);

app.post('/post/create', authMiddleware, createNewBlogPost)

app.get('/post/:id', findById)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, register);

app.post('/users/register', redirectIfAuthenticatedMiddleware, newUser);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, login);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUser);

app.get('/auth/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})


