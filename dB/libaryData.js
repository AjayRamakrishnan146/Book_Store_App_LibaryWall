const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://AjayRamakrishnan12:Aju12K@cluster0.vmjotav.mongodb.net/libaryApp?retryWrites=true&w=majorit', { useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
.then(()=>{
    console.log('connection established')
})
.catch(()=>{
    console.log('unable to connect')
})