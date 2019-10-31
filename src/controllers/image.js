const {
    randomNumber
} = require('../helpers/libs');
const path = require('path')
const controller = {};
const fs = require('fs-extra');
const {
    Image, Comment
} = require('../models/index');

controller.index = async(req, res) => {
    const images = await Image.findOne({_id:req.params.image_id});
    res.render('image',{images});
};

const md5=require('md5');

controller.create = async (req, res) => {

    const saveImage = async() => {
        const imgURL = randomNumber();
        const images = await Image.find({filename: imgURL});
        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgURL);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            const targetPath = path.resolve(`public/upload/${imgURL}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.jpg') {
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgURL + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                res.redirect('/images/'+imageSaved._id);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({Error: ' Solo están permitidas imagenes'});
            }
        }

    }

    saveImage();

};
controller.like = (req, res) => {

};
controller.comment = async (req, res) => {
    const image = await Image.findOne({_id:req.params.image_id});
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/'+image._id);
    }
    
};
controller.remove = (req, res) => {

};

module.exports = controller;