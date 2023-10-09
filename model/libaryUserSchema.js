const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userId:String,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true 
    },
    role: {
        type: String,
        default: 'user'
    }
});

// userSchema.set('toJSON', {
//     transform: function (doc, ret) {
//         delete ret.role;
//     }
// });

const userModel = mongoose.model('userdetails',userSchema);
module.exports = userModel;