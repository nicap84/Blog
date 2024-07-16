const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String
});

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);

module.exports = blogPostModel;