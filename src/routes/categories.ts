import express from 'express'
import { fetchAll, fetchByID, addCategory, updateCategory } from "../controllers/categories"

const router = express.Router();

router.get('/', fetchAll)

router.get('/:id', fetchByID)

router.post('/new', addCategory)

router.put('/:id', updateCategory)

export default router