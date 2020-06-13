import express from 'express';
import { addCategory, fetchAll, fetchAllWithQuizzes, fetchByID, updateCategory } from "../controllers/categories";
import validateToken from '../middleware/tokenauth';

const router = express.Router();

router.get('/', validateToken, fetchAll)

router.get('/with_quizzes', fetchAllWithQuizzes)

router.get('/:id', fetchByID)

router.post('/new', addCategory)

router.put('/:id', updateCategory)

export default router
