import express from 'express'
const router = express.Router();

import GetUsers from '../controllers/user/GetUsers';
import GetUser from '../controllers/user/GetUser';
import UpdateUser from '../controllers/user/UpdateUser';
import DeleteUser from '../controllers/user/DeleteUser';
import auth from '../middlewares/auth';
import { CON_ADMIN_ROLE, CON_BUYER_ROLE, CON_SELLER_ROLE } from '../../utils/constatnts';
import MyProfile from '../controllers/user/MyProfile';
import UpdateProfile from '../controllers/user/UpdateProfile';

//routes
router.get('/my-profile', auth(CON_BUYER_ROLE, CON_SELLER_ROLE), MyProfile);
router.get('/:id', auth(CON_ADMIN_ROLE), GetUser);
router.get('/', auth(CON_ADMIN_ROLE), GetUsers);

router.patch('/my-profile', auth(CON_BUYER_ROLE, CON_SELLER_ROLE), UpdateProfile);
router.patch('/:id', auth(CON_ADMIN_ROLE), UpdateUser);

router.delete('/:id', auth(CON_ADMIN_ROLE), DeleteUser);

export default router;