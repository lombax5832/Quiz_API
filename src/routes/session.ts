import express from 'express'
import { session } from '../controllers/session';
import validateToken from '../middleware/tokenauth';

const router = express.Router();

router.post('/', validateToken, session)

export default router