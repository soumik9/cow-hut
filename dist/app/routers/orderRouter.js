"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CreateOrder_1 = __importDefault(require("../controllers/order/CreateOrder"));
const GetOrders_1 = __importDefault(require("../controllers/order/GetOrders"));
//routes
router.post('/', CreateOrder_1.default);
router.get('/', GetOrders_1.default);
exports.default = router;
