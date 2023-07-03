"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CreateOrder_1 = __importDefault(require("../controllers/order/CreateOrder"));
const GetOrders_1 = __importDefault(require("../controllers/order/GetOrders"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
const GetOrder_1 = __importDefault(require("../controllers/order/GetOrder"));
//routes
router.post('/', (0, auth_1.default)(constatnts_1.CON_BUYER_ROLE), CreateOrder_1.default);
router.get('/:id', (0, auth_1.default)(constatnts_1.CON_BUYER_ROLE, constatnts_1.CON_SELLER_ROLE, constatnts_1.CON_ADMIN_ROLE), GetOrder_1.default);
router.get('/', (0, auth_1.default)(constatnts_1.CON_BUYER_ROLE, constatnts_1.CON_SELLER_ROLE, constatnts_1.CON_ADMIN_ROLE), GetOrders_1.default);
exports.default = router;
