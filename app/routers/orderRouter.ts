import express from 'express'
const router = express.Router();

import CreateOrder from '../controllers/order/CreateOrder';
import GetOrders from '../controllers/order/GetOrders';

//routes
router.post('/', CreateOrder);
router.get('/', GetOrders);


export default router;