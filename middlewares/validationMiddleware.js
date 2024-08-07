export const validationMiddleware = (req, res, next) => {
    const { title, body } = req.body;
    const { image }  = req.files || '';
    if (!title || !body || !image) {
        // return res.status(400).send('Title, body and image are required.');
        return res.redirect('/post/new'); 
    }
    next();
}