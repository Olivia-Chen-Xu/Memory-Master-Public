import mongoose from 'mongoose';

export const cardSchema = mongoose.Schema({
    word: String,
    definition: String,
    context: String,
    ownSentence: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    timesStudied: {
        type: Number,
        default: 0,
    }
})

export const Flashcard = mongoose.model('Flashcard', cardSchema);



