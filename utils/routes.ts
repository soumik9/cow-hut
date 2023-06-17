import express from 'express';
const router = express.Router();

import authRouter from '../app/routers/authRouter'

const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;