export const newUser = (req, res) => {
    const { userName, password } = req.body;
    res.render('register');
 }