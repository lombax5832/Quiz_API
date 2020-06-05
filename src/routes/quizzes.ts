import express from 'express'
import { fetchAll, fetchBySlug, addCategory } from "../controllers/quizzes"

const router = express.Router();

router.get('/', fetchAll)

router.get('/:id', fetchBySlug)

router.post('/new', addCategory)

export default router