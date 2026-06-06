import express from "express"
import { checkAuth, login, signupUser, updateProfile } from "../controllers/user.Controller.js";
import { protectRoute } from "../middleware/auth.Middleware.js";

const userRouter=express.Router();


userRouter.post('/signup',signupUser);
userRouter.post('/login',login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get('/check',protectRoute,checkAuth); // to check if user is still login or not after page refresh



export default userRouter;
