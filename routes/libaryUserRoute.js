const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const jwt = require('jsonwebtoken');

const libaryUserSchema = require('../model/libaryUserSchema');

//get the user details
router.get('/viewusers', async (req,res)=>{
    try {
        const data = await libaryUserSchema.find();
        res.send(data)
    } catch (error) {
        res.status(404).send('Data not found');
        console.log(error);
    }
});

//login api

router.post('/login', async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password; 
    const user = await libaryUserSchema.findOne({username:username});
    if(!user){
        res.json({message:"User is not found"})
    }
    try {
        if(user.password==password){
            jwt.sign({email:username, id:user._id},"lkaju",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token is not generated"})
                } else {
                    res.json({message:"Login Successfully",token:token,data:user}); 
                }
            }
            )
           
        }
        else{
            res.json({message:"Login Failed"});
        }
        
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Login failed" });
    }
})

// signup api
router.post('/signup', async (req,res)=>{
    try {
        const item = req.body;
        const newData = new libaryUserSchema(item);
        const savedData = await newData.save();
        res.json({message:"Registered Successfully"});
        // res.status(200).send('Added successfull')
    } catch (error) {
        res.json('Unable to register')
        console.log(error); 
    }
})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
      const deleteId = req.params.id;
      console.log('Deleting book with ID:', deleteId);
      const deletedUser = await libaryUserSchema.findByIdAndDelete(deleteId);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'Book is not found' });
      }
  
      console.log('Deleted document:', deletedUser);
      res.json({ message: 'Book deleted successfully' });;
    } catch (error) {
      console.error('Book deleting :', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });




module.exports = router; 