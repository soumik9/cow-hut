import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';
import GetUser from '../controllers/user/GetUser';
import UpdateUser from '../controllers/user/UpdateUser';

//routes
router.get('/:id', GetUser);
router.get('/', GetUsers);
router.patch('/:id', UpdateUser);

export default router;