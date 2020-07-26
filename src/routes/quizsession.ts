import express from 'express'
import { getNewSession, getQuizBySessionId, getQuizSessionBySessionId } from '../controllers/quizsession';

const router = express.Router();

router.post('/new', getNewSession)
router.get('/:id', getQuizSessionBySessionId)
router.get('/session/:id', getQuizSessionBySessionId)

export default router;
