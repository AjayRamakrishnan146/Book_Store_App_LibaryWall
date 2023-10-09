const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const jwt = require('jsonwebtoken');


const rentBooksSchema = require('../model/rentBooksSchema');

router.post('/rentbook', async(req,res)=>{
    try {
        const item = req.body;
        const rent = new rentBooksSchema(item);
        const rentSaved = await rent.save();
        res.send('rented')
    } catch (error) {
        res.json('unable to rent');
        console.log(error);
    }
} );

router.get('/viewrent/:token', async (req,res)=>{
    const data = await rentBooksSchema.find();
    try {
        jwt.verify(req.params.token,"lkaju",
        (error,decoded)=>{
          if (decoded && decoded.email) {
            res.send(data)

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



router.get('/rentone/:userId/:token', async (req, res) => {
    const userId = req.params.userId;

        // Use Mongoose to find rental information for the specified userId
        const rentalData = await rentBooksSchema.find({ userId });

        if (rentalData.length === 0) {
            return res.status(404).json({ message: 'No rental data found for the user.' });
        }
    try {
        jwt.verify(req.params.token,"lkaju",
        (error,decoded)=>{
          if (decoded && decoded.email) {
            res.json(rentalData);
          } else {
            res.json({message:"unauthorized user"})
          }
        }
        )
        

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// router.get('/rentone/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         // Use Mongoose to find rental information for the specified userId
//         const rentalData = await rentBooksSchema.find({ userId });

//         if (rentalData.length === 0) {
//             return res.status(404).json({ message: 'No rental data found for the user.' });
//         }

//         res.json(rentalData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

router.put('/toggler/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await rentBooksSchema.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Toggle the status
        task.status = task.status === 'pending' ? 'returned' : 'pending';
        await task.save();

        res.json({ message: 'Status toggled successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;