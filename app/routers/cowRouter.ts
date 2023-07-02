import express from 'express'
const router = express.Router();

import GetCow from '../controllers/cow/GetCow';
import GetCows from '../controllers/cow/GetCows';
import UpdateCow from '../controllers/cow/UpdateCow';
import DeleteCow from '../controllers/cow/DeleteCow';
import CreateCow from '../controllers/cow/CreateCow';
import auth from '../middlewares/auth';
import { CON_ADMIN_ROLE, CON_BUYER_ROLE, CON_SELLER_ROLE } from '../../utils/constatnts';

//routes
router.post('/', auth(CON_SELLER_ROLE), CreateCow);
router.get('/:id', auth(CON_ADMIN_ROLE, CON_BUYER_ROLE, CON_SELLER_ROLE), GetCow);
router.get('/', auth(CON_ADMIN_ROLE, CON_BUYER_ROLE, CON_SELLER_ROLE), GetCows);
router.patch('/:id', auth(CON_SELLER_ROLE), UpdateCow);
router.delete('/:id', auth(CON_SELLER_ROLE), DeleteCow);

export default router;