const mongoose= require('mongoose');
const bookShema = mongoose.Schema({
    bookId:String,
    book:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
        
    },
    genre:{
        type:String,
        required:true
        
    },
    isbn:{
        type:Number,
        required:true
        
    },
    status:{
        type:String,
        required:true
        
    },
    reviews:{
        type:String,
       
        
    },
    image: {
        data: Buffer, // Binary data for the image
        contentType: String, // MIME type of the image (e.g., 'image/jpeg')
      }

})

const bookModel = mongoose.model('booksDetails',bookShema);
module.exports = bookModel;