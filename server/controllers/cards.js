import express from 'express';
import mongoose from 'mongoose';

import {Flashcard} from '../models/card.js'

const router = express.Router();

export const getCards = async (req, res) => { 
    try {
        const cards = await Flashcard.find({ creator: req.userId }).exec();
                
        res.status(200).json(cards);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCard = async (req, res) => {
    const card = req.body;

    const newCard = new Flashcard({ ...card, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newCard.save();
        console.log(newCard);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCard = async (req, res) => {
    const { id } = req.params;
    const {word, definition, context, ownSentence, creator} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);

    const updatedCard = {word, definition, context, ownSentence, creator, _id: id };

    await Flashcard.findByIdAndUpdate(id, updatedCard, { new: true });

    res.json(updatedCard);
}

export const deleteCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);

    await Flashcard.findByIdAndRemove(id);

    res.json({ message: "Card deleted successfully." });
}
