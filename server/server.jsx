const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = 8080;

// app.use(cors({
//     origin: 'http://localhost:3000', // Client URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Authorization,Content-Type',
// }));
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Routes

//about me
const aboutMeRouter = require('./routes/aboutmeRouter.jsx');
app.use('/aboutmeRouter', aboutMeRouter);

//contact me
const contactMeRouter = require('./routes/contactmeRouter.jsx');
app.use('/contactMeRouter', contactMeRouter);

//projects 
const projectsRouter = require('./routes/projectsRouter.jsx');
app.use('/projRouter', projectsRouter);

//experience
const experienceRouter = require('./routes/experienceRouter.jsx');
app.use('/experienceRouter', experienceRouter);

//auth
const authRouter = require('./routes/authRouter.jsx');
app.use('/auth', authRouter);

//profile
const profileRouter = require('./routes/profileRouter.jsx');
app.use('/profileRouter', profileRouter);

//listen
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

