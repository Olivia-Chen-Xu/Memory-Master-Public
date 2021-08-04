import express from 'express';
import mongoose from 'mongoose';

import Set from '../models/set.js';

const router = express.Router();

export const getSets = async (req, res) => { 
    try {
        const sets = await Set.find({ creator: req.userId }).exec();
                
        res.status(200).json(sets);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSet = async (req, res) => {
    const set = req.body;

    const newSet = new Set({ ...set, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newSet.save();

        res.status(201).json(newSet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSet = async (req, res) => {
    const { id } = req.params;
    const { name, cards } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No set with id: ${id}`);

    const updatedSet = {name, cards, _id: id };

    await Set.findByIdAndUpdate(id, updatedSet, { new: true });

    res.json(updatedSet);
}

export const deleteSet = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No set with id: ${id}`);

    await Set.findByIdAndRemove(id);

    res.json({ message: "Set deleted successfully." });
}
