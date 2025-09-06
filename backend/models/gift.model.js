import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    giftName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: 
    {
        type: Number,
        required: true
    },
    url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Gift = mongoose.model('Gift', giftSchema);