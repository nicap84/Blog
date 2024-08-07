import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { newBlogPost, createNewBlogPost, findAll, 
    aboutController, contactController, 
    findById, newUser, register} from './controllers/index.js';
import { validationMiddleware } from './middlewares/validationMiddleware.js';    


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

app.get('/', findAll);

app.get('/about', aboutController);

app.get('/contact', contactController);

app.get('/post/new', newBlogPost);

app.post('/post/create', createNewBlogPost)

app.get('/post/:id', findById)

app.get('/auth/register', register);

app.post('/users/register', newUser);

