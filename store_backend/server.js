require('dotenv').config(); // connect enviorment variables 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // port not found

// Middleware
app.use(express.json()); // Allows works with JSON requests
app.use(cors()); // Alloows Front End works with BackEnd


// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('connected to MongoDB'))
.catch(err => console.log('Can"t connect to MongoDB', err));

/**Main route */
app.get('/', (req,  res) =>{
    res.send('Api works!')
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})