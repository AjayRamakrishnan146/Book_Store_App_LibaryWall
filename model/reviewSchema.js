const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    userId:{
        type:String
    },
    bookId:{
        type:String
    },
    bookName:{
        type:String
    },
    review:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const reviewModel = mongoose.model('reviews',reviewSchema);
module.exports = reviewModel;