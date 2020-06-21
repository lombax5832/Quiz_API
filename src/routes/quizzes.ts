import express from 'express'
import { fetchAll, fetchByID, addQuiz, updateQuiz, fetchAllWithCategories } from "../controllers/quizzes"

const router = express.Router();

router.get('/', fetchAll)

router.get('/with_categories', fetchAllWithCategories)

router.get('/:id', fetchByID)

router.post('/new', addQuiz)

router.put('/:id', updateQuiz)

export default router