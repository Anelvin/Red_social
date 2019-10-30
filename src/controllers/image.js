const {randomNumber} = require('../helpers/libs');
const path = require('path')
const controller={};
const fs = require('fs-extra');

controller.index=(req,res)=>{

};

controller.create=async (req,res)=>{
    const imgURL = randomNumber();
    console.log(imgURL);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLocaleLowerCase();
    const targetPath = path.resolve(`public/upload/${imgURL}${ext}`);

    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.jpg'){
        await fs.rename(imageTempPath, targetPath);
    }
    res.send('funciona');

};
controller.like=(req,res)=>{

};
controller.comment=(req,res)=>{

};
controller.remove=(req,res)=>{

};

module.exports=controller;