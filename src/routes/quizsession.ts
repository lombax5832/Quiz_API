import express from 'express'
import { getNewSession, getQuizBySessionId } from '../controllers/quizsession';

const router = express.Router();

router.post('/new', getNewSession)
router.get('/:id', getQuizBySessionId)

export default router;
