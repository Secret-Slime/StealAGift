import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bycrypt from 'bcryptjs';
import User from './models/user.model.js';
import Gift from './models/gift.model.js';


// load enviroment variables
dotenv.config();
const app = express();
const port = 3000;

// mongoDB connection setup from .env
const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_CLUSTER } = process.env;
const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}`;

// mongoDB connection
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => { 
        console.log('MongoDB connection error:', err) 
        process.exit(1);
    });

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Adjust to frontend location as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};

// API Routes

// User registration
app.post('/users/register', async (req, res) => {
    // Succesful registration redirects to login for jwt token generation
    try {
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// User login
app.post('/users/login', async (req, res) => {
    const user = await User.find
        if (!user || user == null) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
    try {
        if(await bycrypt.compare(req.body.password, user.password)) {
            return res.status(200).json({ message: 'Login successful', userId: user._id });
        } else {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
    // Token generation
    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken })
    // Refresh functionality to be added later

});



