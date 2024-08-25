import mongoose from 'mongoose';
// collection
const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    userName: String,
    postDate: {
        type: Date,
        default: new Date()
    },
    image: String,
});

export const blogPostModel = mongoose.model('BlogPost', blogPostSchema);