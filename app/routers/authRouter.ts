import express from 'express'
const router = express.Router();

import Signup from '../controllers/auth/signup';

//routes
router.post('/signup', Signup);

export default router;