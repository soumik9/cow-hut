import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';
import GetUser from '../controllers/user/GetUser';

//routes
router.get('/:id', GetUser);
router.get('/', GetUsers);

export default router;