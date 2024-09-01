import { blogPostModel } from '../models/blogPost.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = dirname(__dirname);

export const newBlogPost = (req, res) => {
    if (req.session.userId) {
        const errorMessage = req.session.postValidationError;
        delete req.session.postValidationError;
        return res.render('create', {
            errorMessage
        });
    } else {
        return res.redirect('/auth/login');
    }
}

export const createNewBlogPost = async (req, res) => {
    const { title, body } = req.body;
    const image = req.files?.image || undefined;
    try {
        const pathToUpload = resolve(parentDir,'public/img',image?.name);
        await image.mv(pathToUpload, async(error) => {
            if (error) {
                throw new Error(error);
            }
        });
        await blogPostModel.create({title, body, userName: req.session.userName, image: `/img/${image.name}`});
        return res.redirect('/'); 
    } catch(error) {
        req.session.postValidationError = error.message;
        res.redirect('/post/new');
    } 
}