import express from 'express';

import authRouter from '../app/routers/authRouter'
import userRouter from '../app/routers/userRouter'
import cowRouter from '../app/routers/cowRouter'
import orderRouter from '../app/routers/orderRouter'
import adminRouter from '../app/routers/adminRouter'

const router = express.Router();

const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/admins',
        route: adminRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
    {
        path: '/cows',
        route: cowRouter,
    },
    {
        path: '/orders',
        route: orderRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;