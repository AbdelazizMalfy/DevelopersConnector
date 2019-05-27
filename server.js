const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

const port = process.env.PORT || 5001 ;

// body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Config DB 
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then( () => console.log('MongoDB connected'))
    .catch( err => console.log(err));

// Passport middleware 
app.use(passport.initialize());

// Passport config

require('./config/passport')(passport);


app.get('/', (req,res) => res.send('hello app'));

// Use Route 
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)


// Serve static assets if in production 
if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}




app.listen(port, () => console.log(`Server running on port ${port}`));