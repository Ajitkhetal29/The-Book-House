import { register, login, getUserDetails, addToWishList, getUserWishlist, removeFromWishlist, getBurrowedBook, getAllUsers, deleteUser, getNotifications } from "../controller/user.js";

import express from 'express'
import { getUser, verifyAdmin, verifyUser } from "../middlewares/user.js";

const userRouter = express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/userDetails',getUser,getUserDetails)
userRouter.post('/addToWishlist/:id',verifyUser,addToWishList)
userRouter.get('/userWishlist/',verifyUser, getUserWishlist)
userRouter.post('/removeFromWishlist/:id',verifyUser, removeFromWishlist)
userRouter.get('/getBurrowedBook',verifyAdmin, getBurrowedBook)
userRouter.get("/allUsers", verifyAdmin, getAllUsers)
userRouter.post("/deleteUser", verifyUser, deleteUser)
userRouter.get("/notification", verifyUser, getNotifications)


export default userRouter