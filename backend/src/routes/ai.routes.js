import {Router} from 'express';
import { aiController } from '../controllers/ai.controller.js'

const router = Router();

const aiControllers = new aiController()
router.post('/get-review',aiControllers.getReview)

export default router;