const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    image_id:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    gravatar:String,
    comment:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

CommentSchema.virtual('image')
    .set(function(image){
        this._image = image;
    })
    .get(function(){
        return this._image;
    })

module.exports = mongoose.model('Comment',CommentSchema);