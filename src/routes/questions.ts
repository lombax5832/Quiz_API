import express from 'express';
import { addQuestion, fetchByID, updateQuestion } from '../controllers/questions';

const router = express.Router();

router.get('/:id', fetchByID)

router.post('/new', addQuestion)

router.put('/:id', updateQuestion)

export default router