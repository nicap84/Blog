import { blogPostModel } from '../models/blogPost.js';

export const findAll = async (req, res) => {
    const blogPostEntries = await blogPostModel.find({}).sort({postDate: -1});
    res.render('index', {blogPosts: blogPostEntries});
}

export const findById = async (req, res) => {
    if (req.params.id) {
        const blogpostEntry = await blogPostModel.findById(req.params.id);
        return res.render('post', {blogPost: blogpostEntry});
    }
    return es.render('post');
}