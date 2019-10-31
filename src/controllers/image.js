const {randomNumber} = require('../helpers/libs');
const path = require('path')
const controller = {};
const fs = require('fs-extra');
const {Image, Comment} = require('../models/index');
const md5 = require('md5');


controller.index = async (req, res) => {
    const viewModel = {
        image: {},
        comments: {}
    }
    const image = await Image.findOne({
        _id: req.params.image_id
    });
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({
            image_id: image._id
        })
        viewModel.comments = comments;
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
};


controller.create = async (req, res) => {

    const saveImage = async () => {
        const imgURL = randomNumber();
        const images = await Image.find({
            filename: imgURL
        });
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
                res.redirect('/images/' + imageSaved._id);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({
                    Error: ' Solo están permitidas imagenes'
                });
            }
        }

    }

    saveImage();

};
controller.like = async (req, res) => {
    const image = await Image.findOne({_id:req.params.image_id});
    if(image){
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes:image.likes})
    }else{
        res.status(500).json({error:'Internal Error'});
    }
};
controller.comment = async (req, res) => {
    console.log('hasta aqui');
    const image = await Image.findOne({
        _id: req.params.image_id
    });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image._id);
    } else {
        res.redirect('/');
    }

};
controller.remove = async (req, res) => {
    const image = await Image.findOne({_id:req.params.image_id});
    if(image){
        await fs.unlink(path.resolve('public/upload/'+image.filename));
        await Comment.deleteOne({image_id:image._id});
        await image.remove();
        res.json(true);
    }
};

module.exports = controller;