import mongoose from 'mongoose';

export const cardSchema = mongoose.Schema({
    word: String,
    definition: String,
    context: String,
    ownSentence: String,
    creator: String,
    set: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export var Flashcard = mongoose.model('Flashcard', cardSchema);



