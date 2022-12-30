const express = require('express');
const commentRouter = express.Router();

const { createCommentCtrl, fetchAllCommentCtrl, fetchSingleCommentCtrl, updateCommentCtrl, deleteCommentCtrl } = require("../../controllers/comments/commentCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');


commentRouter.post("/", authMiddleware,createCommentCtrl)
commentRouter.get("/",fetchAllCommentCtrl)
commentRouter.get("/:id",fetchSingleCommentCtrl)
commentRouter.put("/:id",authMiddleware,updateCommentCtrl)
commentRouter.delete("/:id",authMiddleware,deleteCommentCtrl)




module.exports = commentRouter;
