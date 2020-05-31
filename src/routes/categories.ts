import express from 'express'
import { fetchAll, fetchBySlug } from "../controllers/categories"

const router = express.Router();

router.get('/', fetchAll)

router.get('/:id', fetchBySlug)

export default router