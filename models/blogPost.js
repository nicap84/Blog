import mongoose from 'mongoose';
// collection
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'] 
    },    
    body: {
        type: String,
        required: [ true, 'Please provide a description']
    },    
    userName: String,
    postDate: {
        type: Date,
        default: new Date()
    },
    image: String,
});

export const blogPostModel = mongoose.model('BlogPost', blogPostSchema);