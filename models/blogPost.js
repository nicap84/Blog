const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    userName: String,
    postDate: {
        type: Date,
        default: new Date()
    }
});

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);

module.exports = blogPostModel;