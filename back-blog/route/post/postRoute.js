const express = require('express')
const { createPostCtrl, fetchPostsCtrl, fetchSinglePostCtrl, updatePostCtrl, deletePostCtrl, toggleAddLikeToPostCtrl, toggleAddDisLikeToPostCtrl } = require('../../controllers/post/postCntrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload, postImgresize } = require('../../middlewares/upload/photoupload');



const postRoute = express.Router();

postRoute.post("/",authMiddleware,photoUpload.single("image"),postImgresize,createPostCtrl)
postRoute.put("/likes",authMiddleware,toggleAddLikeToPostCtrl)
postRoute.put("/dislikes",authMiddleware,toggleAddDisLikeToPostCtrl)
postRoute.get("/",fetchPostsCtrl)
postRoute.get("/:id",fetchSinglePostCtrl)
postRoute.put("/:id",authMiddleware,updatePostCtrl)
postRoute.delete("/:id",authMiddleware,deletePostCtrl)

module.exports = postRoute;