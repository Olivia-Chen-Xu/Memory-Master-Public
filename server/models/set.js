import mongoose from 'mongoose';
import {cardSchema} from './card.js';

const setSchema = mongoose.Schema({
    name: String,
    creator: String,
    cards: {
        type: [cardSchema],
        default: []
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model("Set", setSchema);