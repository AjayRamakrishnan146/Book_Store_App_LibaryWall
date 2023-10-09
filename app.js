const express= require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
var cors = require('cors'); 
app.use(cors());


const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


require('./dB/libaryData');

const libaryUserRoute= require('./routes/libaryUserRoute');
app.use('/api',libaryUserRoute);

const libaryBookRoute = require('./routes/libaryBookRoute');
app.use('/api', libaryBookRoute);

const rentBookRoute = require('./routes/rentBookRoute');
app.use('/api', rentBookRoute);

const reviewRoute = require('./routes/reviewRoute');
app.use('/api',reviewRoute);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

