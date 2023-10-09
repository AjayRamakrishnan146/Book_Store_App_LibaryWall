const mongoose = require('mongoose');
const rentSchema = mongoose.Schema({
    userId:{
        type:String
    },
    bookId:{
        type:String
    },
    userName:{
        type:String,
        required:true
    }, 
    phone:{
        type:Number,
        required:true
    },
    bookName:{
        type:String
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    }
    
});

const rentModel = mongoose.model('rentBooks',rentSchema);
module.exports = rentModel