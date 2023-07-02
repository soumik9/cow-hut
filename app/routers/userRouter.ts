import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';
import GetUser from '../controllers/user/GetUser';
import UpdateUser from '../controllers/user/UpdateUser';
import DeleteUser from '../controllers/user/DeleteUser';
import auth from '../middlewares/auth';
import { CON_ADMIN_ROLE } from '../../utils/constatnts';

//routes
router.get('/:id', auth(CON_ADMIN_ROLE), GetUser);
router.get('/', auth(CON_ADMIN_ROLE), GetUsers);
router.patch('/:id', auth(CON_ADMIN_ROLE), UpdateUser);
router.delete('/:id', auth(CON_ADMIN_ROLE), DeleteUser);

export default router;