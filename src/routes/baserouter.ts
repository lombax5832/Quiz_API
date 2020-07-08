import * as express from 'express';
import categoriesRouter from "./categories";
import quizRouter from "./quizzes";
import questionRouter from './questions';
import sessionRouter from './session'
import quizSessionRouter from './quizsession';

const router = express.Router();

router.get('/', (req, res) => res.json({ "message": "Hello" }));
router.use('/categories', categoriesRouter);
router.use('/quizzes', quizRouter);
router.use('/questions', questionRouter)
router.use('/session', sessionRouter)
router.use('/quizsession', quizSessionRouter)

export default router
