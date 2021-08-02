import express from 'express'
import { getNewSession, getQuizBySessionId, getQuizSessionBySessionId } from '../controllers/quizsession';
import { loadUser } from '../middleware/loaduser';

const router = express.Router();

router.post('/new', loadUser, getNewSession)
router.get('/:id', getQuizSessionBySessionId)
router.get('/session/:id', getQuizSessionBySessionId)

export default router;
