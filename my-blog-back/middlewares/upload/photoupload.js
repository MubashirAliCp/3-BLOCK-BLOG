const multer = require("multer")
const sharp = require("sharp");
const path = require("path");
const { pathToFileURL } = require("url");

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb({
            Message:'unsupported file format',
        },false)
    }
}

const photoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits:{fileSize:1000000}
   
})



//image resizing

const profilePhotoresize = async(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename =  `user-${Date.now()}-${req.file.originalname}`
   
    await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(path.join(`public/images/profile/${req.file.filename}`))
    next()

}


//POST IMG RESIZING

const postImgresize = async(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename =  `user-${Date.now()}-${req.file.originalname}`
   
    await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(path.join(`public/images/posts/${req.file.filename}`))
    next()

}

module.exports = {photoUpload,profilePhotoresize,postImgresize}