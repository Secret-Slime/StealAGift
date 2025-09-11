import User from '../backend/models/user.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { getUserId } from 'storage.js';

// randomly pick reciever
export async function pickReciever() {
    try {
        const users = await User.find({}, { username: 1, picked: 1 });
        const currentUser = await User.findById(getUserId());
        
        if (User.picked === false && User._Id !== currentUser._Id) {
            const shuffledUsers = users.sort(() => 0.5 - Math.random());
            const Receiver = shuffledUsers[Math.floor(Math.random() * shuffledUsers.length)]
            Receiver.picked = true;
            await Receiver.save();
            currentUser.receiver = Receiver.username;
            await currentUser.save();
            return res.status(200).json({ message: "You've got ", receiver: Receiver.username + '!' });
        }
        if (users.length < 2) {
            return res.status(400).json({ message: 'Not enough users to pick from' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}