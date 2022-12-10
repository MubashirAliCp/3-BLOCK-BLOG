const { response } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comments/comment");
const validateMongodbId = require("../../utils/validateMongodbId");

//----------------------
//create comment
//----------------------
const createCommentCtrl = expressAsyncHandler(async(req,res)=>{
   // get the user
   const user = req.user;
   //get the post id
   const {postId,description} = req.body;

   try{
    const comment = await Comment.create({
        post: postId,
        user,
        description,
    });
    res.json(comment)
   }catch(error){
    res.json(error)
   }
})


//----------------------
// fetch all comments
//----------------------

const fetchAllCommentCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const comments= await Comment.find({}).sort("-createdAt")
        res.json(comments)
    }catch(error){
        res.json(error)
    }
})




//----------------------
//fetch a single comment 
//----------------------

const fetchSingleCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try{
        const comments =await Comment.findOne({})
        res.json(comments)
    }catch(error){
        res.json(error)
    }
})



//----------------------
// update comments
//----------------------

const updateCommentCtrl = expressAsyncHandler(async(req,res)=>{
   const {id} = req.params
   validateMongodbId(id)
   try{
    const update = await Comment.findByIdAndUpdate(id,{
        post: req.body?.postId,
        user: req.body?.user,
        description: req?.body?.description
    },
      {
        new:true,
        runValidators:true
      },
    );
    res.json(update)
   }catch(error){
    res.json(error)
   }
})


//----------------------
//delete comment
//----------------------

const deleteCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const comment = await Comment.findOneAndDelete(id)
        res.json(comment)
    }catch(error){
        res.json(error)
    }
})



module.exports = {createCommentCtrl,fetchAllCommentCtrl,fetchSingleCommentCtrl,updateCommentCtrl,deleteCommentCtrl}