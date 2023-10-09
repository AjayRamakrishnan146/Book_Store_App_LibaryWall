const express = require('express');
const router = express.Router();

const multer = require('multer');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const path = require('path');
const fs = require('fs');

const jwt = require('jsonwebtoken');




const libaryBookSchema = require('../model/libaryBookSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename files to prevent conflicts
    },
  });


  const upload = multer({ storage });




//view the books
router.get('/viewbooks/:token' ,upload.single('bookImage'), async(req,res)=>{
    const bookData = await libaryBookSchema.find();    
    try {
      jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
          res.send(bookData)
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
        
    } catch (error) {
        res.status(404).send('Data not found');
        console.log(error);
    }
});

router.get('/viewstatus/:token' , async(req,res)=>{
  const booksData = await libaryBookSchema.find();    
  try {
    jwt.verify(req.params.token,"lkaju",
  (error,decoded)=>{
    if (decoded && decoded.email) {
        res.send(booksData)
    } else {
      res.json({message:"unauthorized user"})
    }
  }
  )
      
  } catch (error) {
      res.status(404).send('Data not found');
      console.log(error);
  }
});




// add books
router.post('/addbook', upload.single('image'),  (req, res) => {
    try {
      // Access the uploaded image from req.file
      const image = req.file;
  
      // Parse the JSON data from req.body
      const { book, author, genre, isbn, status, reviews } = req.body;
  
      // Create a new book instance and set the image and JSON data
      const newBook = new libaryBookSchema({
        book,
        author,
        genre,
        isbn,
        status,
        reviews,
        image: {
          data: fs.readFileSync(image.path), // Read image data from the uploaded file
          contentType: image.mimetype, // MIME type of the image
        },
      });
  
      
      jwt.verify(req.body.token,"lkaju",
      (error,decoded)=>{
        if (decoded && decoded.email) {
           newBook.save();
          res.status(201).json({ message: 'Book created successfully' });
          console.log(newBook)
          
        } else {
          res.json({message:"unauthorized user"});
        }
      }
      )
    } catch (error) {
        res.status(404).send('Unable to upload');
        console.log(error);
    }
  });


  // router.post('/addbook', upload.single('image'), async (req, res) => {
  //   try {
  //     // Access the uploaded image from req.file
  //     const image = req.file;
  
  //     // Parse the JSON data from req.body
  //     const { book, author, genre, isbn, status, reviews } = req.body;
  
  //     // Create a new book instance and set the image and JSON data
  //     const newBook = new libaryBookSchema({
  //       book,
  //       author,
  //       genre,
  //       isbn,
  //       status,
  //       reviews,
  //       image: {
  //         data: fs.readFileSync(image.path), // Read image data from the uploaded file
  //         contentType: image.mimetype, // MIME type of the image
  //       },
  //     });
  
  //     await newBook.save();
  //     res.status(201).json({ message: 'Book created successfully' });
  //     console.log(newBook)
  //   } catch (error) {
  //       res.status(404).send('Data not found');
  //       console.log(error);
  //   }
  // });




// get api for fantasy books
router.get('/fantasy/:token', async (req, res) => {
  const fantasyBooks = await libaryBookSchema.find({ genre: 'fantasy' });
  const fantasyBooksInfo = fantasyBooks.map((book) => ({
    _id: book._id,
    imageName: book.image.data ? book.image.data.toString('base64') : '',
    bookName:book.book,
    author: book.author,
    genre: book.genre,
    status:book.status
  }));
  try {
    jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(fantasyBooksInfo);
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
   
    
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});



//get api for horror books
router.get('/horror/:token', async (req, res) => {
  const horrorBooks = await libaryBookSchema.find({ genre: 'horror' });
    const fantasyBooksInfo = horrorBooks.map((book) => ({
      imageName: book.image.data ? book.image.data.toString('base64') : '',
      _id: book._id,
      author: book.author,
      genre: book.genre,
      status:book.status
    }));
  try {
    jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(fantasyBooksInfo);
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
    
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});

//get api for adventure books
router.get('/adventure/:token', async (req, res) => {
    const horrorBooks = await libaryBookSchema.find({ genre: 'adventure' });
    const fantasyBooksInfo = horrorBooks.map((book) => ({
      _id: book._id,
      imageName: book.image.data ? book.image.data.toString('base64') : '',
      author: book.author,
      genre: book.genre,
      status:book.status
    }));
  try {
    jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(fantasyBooksInfo);
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
    
    
    
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});

//get api for romantic books
router.get('/romance/:token', async (req, res) => {
  const horrorBooks = await libaryBookSchema.find({ genre: 'romance' });
    const fantasyBooksInfo = horrorBooks.map((book) => ({
      _id: book._id,
      imageName: book.image.data ? book.image.data.toString('base64') : '',
      author: book.author,
      genre: book.genre,
      status:book.status
    }));
  try {
    jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(fantasyBooksInfo);
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
    
   
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});


//get api for finance books
router.get('/finance/:token', async (req, res) => {
  const horrorBooks = await libaryBookSchema.find({ genre: 'finance' });
  const fantasyBooksInfo = horrorBooks.map((book) => ({
    imageName: book.image.data ? book.image.data.toString('base64') : '',
    _id: book._id,
    author: book.author,
    genre: book.genre,
    status:book.status
    }));
  
  try {
    jwt.verify(req.params.token,"lkaju",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        res.json(fantasyBooksInfo);
      } else {
        res.json({message:"unauthorized user"})
      }
    }
    )
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});


//get api to see each book
router.get('/viewbook/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const viewBook = await libaryBookSchema.findById(id);
    
    if (!viewBook) {
      return res.status(404).send('Data not found');
    }
    
    const BooksInfo = {
      imageName: viewBook.image.data ? viewBook.image.data.toString('base64') : '',
      id: viewBook._id,
      author: viewBook.author,
      genre: viewBook.genre,
      isbn: viewBook.isbn,
      status:viewBook.status,
      book: viewBook.book 
    };
    
    res.send(BooksInfo);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});


router.delete('/deletebook/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    console.log('Deleting book with ID:', deleteId);
    const deletedBook = await libaryBookSchema.findByIdAndDelete(deleteId);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book is not found' });
    }

    console.log('Deleted document:', deletedBook);
    res.json({ message: 'Book deleted successfully' });;
  } catch (error) {
    console.error('Book deleting :', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/toggle/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const task = await libaryBookSchema.findById(id);

      if (!task) {
          return res.status(404).json({ message: 'not  uble to rent not ' });
      }

      // Toggle the status
      task.status = task.status === 'available' ? 'not available' : 'available';
      await task.save();

      res.json({ message: 'Status toggled successfully' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/viewallbooks', async (req, res) => {
  try {
    const allBooks = await libaryBookSchema.find();
    const allBooksInfo = allBooks.map((book) => ({
      _id: book._id,
      imageName: book.image.data ? book.image.data.toString('base64') : '',
      bookName: book.book,
      author: book.author,
      genre: book.genre,
      status: book.status
    }));
    res.json(allBooksInfo);
  } catch (error) {
    res.status(404).send('Data not found');
    console.log(error);
  }
});



  

module.exports = router;