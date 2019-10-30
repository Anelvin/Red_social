const controller={}
const {Image} = require('../models/index');

controller.index=async (req,res)=>{
    const images = await Image.find().sort({timestamp:-1});
    res.render('index',{images});
}

module.exports=controller;