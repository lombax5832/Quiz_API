import * as express from 'express';
import categoriesRouter from "./categories";
import quizRouter from "./quizzes";

const router = express.Router();

router.get('/', (req, res) => res.json({ "message": "Hello" }));
router.use('/categories', categoriesRouter);
router.use('/quizzes', quizRouter);

export default router