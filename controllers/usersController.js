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
      // Refactor this part
      const user =  await userModel.findOne({userName});
      if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
          res.redirect('/');
        }
      } else {
        throw new Error ('Incorrect user');
      }          
    } catch (error){
      res.status(409).send(error);
    }
 }  