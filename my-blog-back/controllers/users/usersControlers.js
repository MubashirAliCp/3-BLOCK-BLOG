
const { response } = require("express");
const fs = require("fs");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/Token/generateToken");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const validateMongodbId = require("../../utils/validateMongodbId");





const userRegister = expressAsyncHandler( async (req,res)=>{
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User already exists");
   try{
    const user = await User.create({
        firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    })
    res.json(user)
   } catch(error){
    res.json(error)
   }

  
});

const loginUserCntrl = expressAsyncHandler(async (req, res) =>{
  const {email,password} = req.body


  const userFound = await User.findOne({email });
 
  if (userFound && (await userFound.isPasswordMatch(password))){
    res.json({
      id: userFound.id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      profilephoto: userFound.profilephoto,
      isAdmin: userFound.isAdmin,
      token: generateToken(userFound?._id)
    });
  }else{
    throw new Error("User not found");
  }
})



//fetch users...

const fetchUsers = expressAsyncHandler(async(req,res)=>{
try{
  const users = await User.find({})
  res.json(users)
}catch{
  res.json(error)
}

})

//------------------------
//deletuser...........
//-------------------------


const deleteUser = expressAsyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongodbId(id)
  try{
    const deleteUser = await User.findByIdAndDelete(id)
    res.json(deleteUser)
  }catch{
    res.json(error)
  }

})


//----------------------
//user details
//----------------------

const fetchUserDetails = expressAsyncHandler(async(req, res)=>{
  const {id} = req.params;
  validateMongodbId(id)

  try{
    const user = await User.findById(id)
    res.json(user)
  }catch{
    res.json(error)
  }
})


//----------------------
//profile
//----------------------

const userProfile = expressAsyncHandler(async(req,res)=>{
  const {id} =req.params;
  validateMongodbId(id)
  
    try{
      const myProfile = await User.findById(id).populate("posts")
      res.json(myProfile)
    }catch(err){
      res.json(error)
    }
})


//----------------------
//update profile
//----------------------

const updateUser = expressAsyncHandler(async(req,res)=>{
const {_id} =req?.user;
// blockUser(req?.user);

validateMongodbId(_id)

const user = await User.findByIdAndUpdate(_id, {
  firstName: req?.body?.firstName,
  lastName: req?.body?.lastName,
  email: req?.body?.email,
  bio: req?.body?.bio,
},
{
  new: true,
  runValidators: true,
})
res.json(user)
})



//----------------------
//update Passwords
//----------------------

const updateUserPasswordCtrl = expressAsyncHandler(async(req,res) => {
  console.log("fist test");
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Find the user by _id
  console.log("started");
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
    console.log("updated");
  } else {
    res.json(user);
  }
});



//------------------------
//following
//------------------------

const followingUser = expressAsyncHandler(async(req,res)=>{
  const {followId} = req.body;
  const loginUserId = req.user.id;

//all ready follwing or not
const targetUser = await User.findById(followId);
const allReadyFollwing = targetUser?.followers?.find(
  user => user?.toString() === loginUserId.toString()
)

if (allReadyFollwing) throw new Error("you have already follwing")


  await User.findByIdAndUpdate(followId,{
    $push: { followers: loginUserId }
    
  },
    {new: true}
  )

  //following

  await User.findByIdAndUpdate(loginUserId,{
    $push: { following: followId }
  },
  {new: true}
  )

  res.json("You have successfully followed this user");
})


//------------------------
//unfollow
//------------------------

const unfollowUser = expressAsyncHandler(async(req,res)=>{

  const {unfollowId} = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing : false,
    },
    {new: true}
  )

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unfollowId },
    },
    {new: true}
  )
  res.json("you have successfully unfollowed")
})



//------------------------
//block user
//------------------------

const blokuser = expressAsyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongodbId(id);

  const user= await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {new: true}
  );
  res.json(user)
})


//------------------------
//unblock user
//------------------------

const unBlokuser = expressAsyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongodbId(id);

  const user= await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false
    },
    {new: true}
  );
  res.json(user)
})




//-----------------------
//profile photo update
//-----------------------

const profilephotoUploadcntrl = expressAsyncHandler(async(req,res)=>{
  const {_id} = req.user;
  //get the path to image
 const localPath = `public/images/profile/${req.file.filename}`;
//upload to cloudinary
 const imgUploaded = await cloudinaryUploadImg(localPath);

 const foundUser = await User.findByIdAndUpdate(
  _id,
  {
    profilephoto:imgUploaded?.url,
  },
  {new:true},
 )
 fs.unlinkSync(localPath)
  res.json(imgUploaded)
})

module.exports = {userRegister,loginUserCntrl,
  fetchUsers,deleteUser,fetchUserDetails,
  userProfile,updateUser,updateUserPasswordCtrl,
  followingUser,unfollowUser,blokuser,
  unBlokuser,profilephotoUploadcntrl}