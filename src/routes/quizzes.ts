import express from 'express'
import { fetchAll, fetchByID, addQuiz, updateQuiz } from "../controllers/quizzes"

const router = express.Router();

router.get('/', fetchAll)

router.get('/:id', fetchByID)

router.post('/new', addQuiz)

router.put('/:id', updateQuiz)

export default router