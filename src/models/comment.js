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

module.exports = mongoose.model('Comment',CommentSchema);