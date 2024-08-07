import { blogPostModel } from '../models/blogPost.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = dirname(__dirname);

export const newBlogPost = (req, res) => {
    res.render('create')
}

export const createNewBlogPost = async (req, res) => {
    const { title, body } = req.body;
    const { image } = req.files;
    const pathToUpload = resolve(parentDir,'public/img',image.name);
    await image.mv(pathToUpload, async(error) => {
        if (error) {
            return res.status(400).send(`The image can't be upload. Error: ${error}`)
        }
        await blogPostModel.create({title, body, userName: 'maria', image: `/img/${image.name}`});
        return res.redirect('/'); 
    });
}