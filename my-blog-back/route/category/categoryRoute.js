const express =require('express');
const { createCategoryCtrl, fetchAllCategoryCtrl, fetchSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } = require('../../controllers/category/categoryCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const categoryRoute = express.Router();


categoryRoute.post("/",authMiddleware,createCategoryCtrl)
categoryRoute.get("/",fetchAllCategoryCtrl)
categoryRoute.get("/:id",fetchSingleCategoryCtrl)
categoryRoute.put("/:id",authMiddleware,updateCategoryCtrl)
categoryRoute.delete("/:id",authMiddleware,deleteCategoryCtrl)


module.exports = categoryRoute;
