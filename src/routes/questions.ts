import express from 'express';
import { addQuestion, fetchByID } from '../controllers/questions';

const router = express.Router();

router.get('/:id', fetchByID)

router.post('/new', addQuestion)

export default router