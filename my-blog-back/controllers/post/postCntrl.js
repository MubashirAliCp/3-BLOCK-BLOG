const expressAsyncHandler = require('express-async-handler')
const fs = require('fs')
const Filter = require("bad-words")
const Post = require('../../model/post/post')
const validateMongodbId = require('../../utils/validateMongodbId')
const User = require('../../model/user/User')
const cloudinaryUploadImg = require('../../utils/cloudinary')

//--------------------------
//create posts
//--------------------------
const createPostCtrl = expressAsyncHandler(async(req,res)=>{
    console.log(req.file);
    const {_id} =req.user;
    // validateMongodbId(req.body.user)
    //check bad wordss
    const filter = new Filter()
    const isProfane = filter.isProfane(req.body.title, req.body.description)
    
    //block user 
    if(isProfane){
        await User.findByIdAndUpdate(_id,{
            isBlocked:true,
        })
        throw new Error("creating failed because of bad words, And You are blocked")
    }
      //get the path to image
 const localPath = `public/images/posts/${req.file.filename}`;
 //upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);

 

   try {
    // const post = await Post.create({
    //     ...req.body,
    //     image: imgUploaded?.url,
    //     user: _id,
      
    // })
    res.json(imgUploaded)
//remove uploaded images
fs.unlinkSync(localPath)

   } catch (error) {
    res.json(error)
   }
})



//----------------------
//fetch all posts
//----------------------

const fetchPostsCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const posts = await Post.find({}).populate('user')
        res.json(posts)
    } catch (error) {
        
    }
    
})


//----------------------
//fetch single post
//----------------------

const fetchSinglePostCtrl = expressAsyncHandler(async(req,res)=>{
    console.log("fetch...");
    const {id} = req.params;
    validateMongodbId(id)
    console.log("validated");
    try {
        console.log("tryyy");
        const post = await Post.findById(id).
        populate("user").
        populate("disLikes").
        populate("likes")
        //update the nomber of views
        await Post.findByIdAndUpdate(
            id,
            {
                $inc:{numViews: 1},
            },
            { new:true}
            );
        res.json(post)
        console.log(post);
    } catch (error) {
       res.json(error) 
    }   
})


//----------------------
//update posts
//----------------------

const updatePostCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            {
            ...req.body,
            user: req.user?._id,
            },
            {
                new: true
            }
            );
            res.json(post)
    } catch (error) {
        res.json(error)
    }
})



//----------------------
//delete posts
//----------------------

const deletePostCtrl = expressAsyncHandler(async(req,res)=>{
   const {id} = req.params
   validateMongodbId(id)
   try {
    const post = await Post.findOneAndDelete(id)
    res.json(post)
   } catch (error) {
    res.json(error)
   }
})


//----------------------
// likes
//----------------------

const toggleAddLikeToPostCtrl = expressAsyncHandler(async(req,res)=>{
  const {postId} = req.body;
  const post = await Post.findById(postId)
 //find the user login
 const loginUserId = req?.user?._id;
 //find the user liked?
 const isLiked = post?.isLiked;
 //check if user fisliked?
 const alreadyDisliked = post?.disLikes?.find(
    userId =>userId?.toString() === loginUserId?.toString()
 );
 //remove user from dislike list if aleadddy exist
 if(alreadyDisliked){
    const post = await Post.findByIdAndUpdate(postId,{
        $pull:{disLikes:loginUserId},
        isDisLiked : false,
    },
    {
        new: true
    }
    );
    res.json(post)
 }
//remove if the user already liked
if(isLiked){
    const post =await Post.findByIdAndUpdate(postId,{
        $pull:{likes:loginUserId},
        isLiked : false,
    },
    {
        new: true
    },
    );res.json(post)
}else{
    //add to likes
    const post = await Post.findByIdAndUpdate(postId,{
        $push:{likes:loginUserId},
        isLiked : true,
    },{new:true}
    );
    res.json(post)
}
})



//----------------------
//dislikes
//----------------------

const toggleAddDisLikeToPostCtrl = expressAsyncHandler(async(req,res)=>{
    const {postId} = req.body;
    const post = await Post.findById(postId);
    //find the user login
    const loginUserId = req?.user?._id;
    //check if the user is already disliked
    const isDisliked = post?.isDisLiked;
    //chek if already like the post 
    const alreadyLiked = post?.likes?.find(
        userId=>userId.toString() === loginUserId?.toString()
    );
    //remove this user from likes aray if it exist 
    if(alreadyLiked){
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull:{likes:loginUserId},
                isLiked : false,
            },
            {new:true}
        );
        res.json(post)
    }

    //toggling
    //remove this user from dislikes if already disliked
    if (isDisliked) {
        console.log("dislikedd");
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull:{disLikes:loginUserId},
                isDisLiked: false,
            },
            {new:true}
        );
        res.json(post)
    }else{
        console.log("diss");
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push:{disLikes:loginUserId},
                isDisLiked:true,
            },
            {new: true}
        );
        res.json(post)
    }

})


module.exports = {createPostCtrl,fetchPostsCtrl,fetchSinglePostCtrl,updatePostCtrl,deletePostCtrl,toggleAddLikeToPostCtrl,toggleAddDisLikeToPostCtrl}