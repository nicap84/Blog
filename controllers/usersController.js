import { userModel } from "../models/user.js";

export const register = (req, res) => {
    res.render('register');
 }

 export const newUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
      await userModel.create({ userName, password});
      res.redirect('/');     
    }catch(erro) {
      res.status(409).send(error);
    }
 }