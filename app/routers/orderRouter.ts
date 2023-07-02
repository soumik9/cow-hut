import express from 'express'
const router = express.Router();

import CreateOrder from '../controllers/order/CreateOrder';
import GetOrders from '../controllers/order/GetOrders';
import auth from '../middlewares/auth';
import { CON_BUYER_ROLE } from '../../utils/constatnts';

//routes
router.post('/', auth(CON_BUYER_ROLE), CreateOrder);
router.get('/', GetOrders);


export default router;