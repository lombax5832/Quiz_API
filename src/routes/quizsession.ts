import express from 'express'
import { getNewSession } from '../controllers/quizsession';

const router = express.Router();

router.post('/new', getNewSession)

export default router;
