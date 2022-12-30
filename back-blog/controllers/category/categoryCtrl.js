const { response } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/category");
const validateMongodbId = require("../../utils/validateMongodbId");


// create category
const createCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const category = await Category.create({
            user: req.user._id,
            title: req.body.title,
        })
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})



// fetch all categories

const fetchAllCategoryCtrl = expressAsyncHandler(async(req,res)=>{
  try {
    const category = await Category.find({})
    .populate("user")
    .sort("-createdAt");
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})
//----------------------

//fetch single categories

const fetchSingleCategoryCtrl = expressAsyncHandler(async(req,res)=>{
const {id} = req.params;
try {
    const category = await Category.findById(id).
    populate("user").
    sort("-createdAt")
    res.json(category)
} catch (error) {
    res.json(error)
}
})
//----------------------


//update category

const updateCategoryCtrl = expressAsyncHandler(async(req,resp)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const category = await Category.findByIdAndUpdate(id,
            {
                title: req?.body?.title,
            },
            {
                new: true,
                runValidators: true,
            }
            )
            resp.json(category)
    } catch (error) {
        
    }
})
//----------------------


//delete category

const deleteCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const category = await Category.findOneAndDelete(id)
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})
//----------------------

module.exports ={createCategoryCtrl,fetchAllCategoryCtrl,fetchSingleCategoryCtrl,updateCategoryCtrl,deleteCategoryCtrl}