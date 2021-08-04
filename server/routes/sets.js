import express from 'express';

import { getSets, createSet, updateSet, deleteSet } from '../controllers/sets.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getSets);
router.post('/', auth, createSet);
router.patch('/:id', auth, updateSet);
router.delete('/:id', auth, deleteSet);

export default router;