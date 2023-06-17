import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';

//routes
router.get('/', GetUsers);

export default router;