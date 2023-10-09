const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const reviewSchema =  require('../model/reviewSchema');

router.post('/addreview', async(req,res)=>{
    try {
        const item = req.body;
        const review = new reviewSchema(item);
        const reviewSaved = await review.save();
        res.send('posted')
    } catch (error) {
        res.json('unable to post');
        console.log(error);
    }
} );

router.get('/reviewone/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Use Mongoose to find rental information for the specified bookId
        const reviewData = await reviewSchema.find({ bookId });

        if (reviewData.length === 0) {
            return res.status(404).json({ message: 'No review data found for the book.' });
        }

        res.json(reviewData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

