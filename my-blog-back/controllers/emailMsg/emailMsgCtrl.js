const expressAsyncHandler = require("express-async-handler");

const sendEmailMsgCtrl = expressAsyncHandler(async(req,res)=>{
    res.json("message")
})


module.exports = {sendEmailMsgCtrl}