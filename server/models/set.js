import mongoose from 'mongoose';
import {cardSchema} from './card.js';

const setSchema = mongoose.Schema({
    name: String,
    creator: String,
    cards: [cardSchema], //error: `model` is not a valid type within the array
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

export default mongoose.model("Set", setSchema);