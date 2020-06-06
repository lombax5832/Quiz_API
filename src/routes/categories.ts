import express from 'express';
import { addCategory, fetchAll, fetchAllWithQuizzes, fetchByID, updateCategory } from "../controllers/categories";

const router = express.Router();

router.get('/', fetchAll)

router.get('/with_quizzes', fetchAllWithQuizzes)

router.get('/:id', fetchByID)

router.post('/new', addCategory)

router.put('/:id', updateCategory)

export default router