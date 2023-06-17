import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';
import GetUser from '../controllers/user/GetUser';
import UpdateUser from '../controllers/user/UpdateUser';
import DeleteUser from '../controllers/user/DeleteUser';

//routes
router.get('/:id', GetUser);
router.get('/', GetUsers);
router.patch('/:id', UpdateUser);
router.delete('/:id', DeleteUser);

export default router;