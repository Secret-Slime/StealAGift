import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bycrypt from 'bcryptjs';
import User from './models/user.model.js';


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

// API CRUD endpoints

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

// get user gift list
app.get('/users/:id/gifts', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id, 'gifts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.gifts); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// add gift to list
app.post('/users/:id/gifts', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.gifts.push(req.body);
        await user.save();
        res.status(200).json({ message: 'Gift added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding gift', error: error.message });
    }
});

// delete gift from list
app.delete('/users/:id/:giftId', authToken, async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.gifts = user.gifts.filter(gift => gift.id !== req.params.giftId);
        await user.save();
        res.status(200).json({ message: 'Gift deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gift', error: error.message });
    }
});

// update gift in list
app.put('/users/:id/:giftId', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const giftIndex = user.gifts.findIndex(gift => gift.id === req.params.giftId);
        if (giftIndex === -1) {
            return res.status(404).json({ message: 'Gift not found' });
        }
        user.gifts[giftIndex] = req.body;
        await user.save();
        res.status(200).json({ message: 'Gift updated successfully' });
    } catch (error) {

    }
});

// set gift receiver
app.put('/users/:id/receiver', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.receiver = req.body.receiver;
        await user.save();
        res.status(200).json({ message: 'Receiver set successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error setting receiver', error: error.message });
    }
});

