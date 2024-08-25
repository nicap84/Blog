import { userModel } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/');
        }

        const isUserLogged = await userModel.findById(userId);
        if (!isUserLogged) {
            return res.redirect('/'); 
        }
        next();
    } catch (error) {
        throw new Error ('Authorization error :: ', error);
    }
}