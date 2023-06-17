import express from 'express'
const router = express.Router();

import signup from '../controllers/auth/signup';

//routes
router.post('/signup', signup);

export default router;