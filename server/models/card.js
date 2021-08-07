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
})

export const Flashcard = mongoose.model('Flashcard', cardSchema);



