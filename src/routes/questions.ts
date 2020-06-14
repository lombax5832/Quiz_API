import express from 'express';
import { addQuestion, fetchByID, fetchByQuizID, updateQuestion } from '../controllers/questions';

const router = express.Router();

router.get('/:id', fetchByID)

router.get('/quiz/:quiz_id', fetchByQuizID)

router.post('/new', addQuestion)

router.put('/:id', updateQuestion)

export default router