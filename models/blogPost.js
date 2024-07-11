const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String
});

const blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost;