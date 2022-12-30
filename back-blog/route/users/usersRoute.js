const express = require("express");

const {
    userRegister,
    loginUserCntrl,
    fetchUsers,
    deleteUser,
    fetchUserDetails,
    userProfile,
    updateUser,
    updateUserPasswordCtrl,
    followingUser,
    unfollowUser,
    blokuser,
    unBlokuser,
    profilephotoUploadcntrl,
} = require("../../controllers/users/usersControlers");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const { photoUpload, profilePhotoresize } = require("../../middlewares/upload/photoupload");




const userRoutes = express.Router();

userRoutes.post("/register",userRegister);
userRoutes.post("/login",loginUserCntrl);
userRoutes.get("/",authMiddleware,fetchUsers)
userRoutes.get("/profile/:id",authMiddleware,userProfile)
userRoutes.put("/",authMiddleware,updateUser)
//multer
userRoutes.put("/profilephotoupload",authMiddleware,photoUpload.single("image"),profilePhotoresize,profilephotoUploadcntrl)
userRoutes.put("/follow/:id",authMiddleware,followingUser)
userRoutes.put("/unfollow/:id",authMiddleware,unfollowUser)
userRoutes.put("/blockuser/:id",authMiddleware,blokuser)
userRoutes.put("/unblockuser/:id",authMiddleware,unBlokuser)
userRoutes.put("/password/:id",authMiddleware,updateUserPasswordCtrl)
userRoutes.delete("/:id",deleteUser)
userRoutes.get("/:id",fetchUserDetails)

module.exports = userRoutes;