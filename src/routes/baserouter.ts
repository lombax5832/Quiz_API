import * as express from 'express';
import categoriesRouter from "./categories";

const router = express.Router();

router.get('/', (req, res) => res.json({ "message": "Hello" }));
router.use('/categories', categoriesRouter);

export default router