import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    res.render('register');
 }

 export const newUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
      await userModel.create({ userName, password});
      res.redirect('/');     
    }catch(error) {
      res.status(409).send(error);
    }
 }

 export const login = (req, res) => {
    res.render('login');
 }

 export const loginUser = async (req, res) => {
    try {
      const { userName, password } = req.body;
      // TODO: Refactor this part
      const user =  await userModel.findOne({userName});
      if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
          req.session.userId = user._id;
          res.redirect('/');
        } else {
          throw new Error ('Incorrect password');
        }
      } else {
        throw new Error ('Incorrect user');
      }          
    } catch (error){
      res.status(409).send(error);
    }
 }  