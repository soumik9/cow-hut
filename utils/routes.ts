import express from 'express';
const router = express.Router();

import authRouter from '../app/routers/authRouter'
import userRouter from '../app/routers/userRouter'

const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;