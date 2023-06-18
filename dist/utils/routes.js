"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("../app/routers/authRouter"));
const userRouter_1 = __importDefault(require("../app/routers/userRouter"));
const cowRouter_1 = __importDefault(require("../app/routers/cowRouter"));
const orderRouter_1 = __importDefault(require("../app/routers/orderRouter"));
const router = express_1.default.Router();
const apiRoutes = [
    {
        path: '/auth',
        route: authRouter_1.default,
    },
    {
        path: '/users',
        route: userRouter_1.default,
    },
    {
        path: '/cows',
        route: cowRouter_1.default,
    },
    {
        path: '/orders',
        route: orderRouter_1.default,
    },
];
apiRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
