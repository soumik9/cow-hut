"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const GetCow_1 = __importDefault(require("../controllers/cow/GetCow"));
const GetCows_1 = __importDefault(require("../controllers/cow/GetCows"));
const UpdateCow_1 = __importDefault(require("../controllers/cow/UpdateCow"));
const DeleteCow_1 = __importDefault(require("../controllers/cow/DeleteCow"));
const CreateCow_1 = __importDefault(require("../controllers/cow/CreateCow"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
//routes
router.post('/', (0, auth_1.default)(constatnts_1.CON_SELLER_ROLE), CreateCow_1.default);
router.get('/:id', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE, constatnts_1.CON_BUYER_ROLE, constatnts_1.CON_SELLER_ROLE), GetCow_1.default);
router.get('/', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE, constatnts_1.CON_BUYER_ROLE, constatnts_1.CON_SELLER_ROLE), GetCows_1.default);
router.patch('/:id', (0, auth_1.default)(constatnts_1.CON_SELLER_ROLE), UpdateCow_1.default);
router.delete('/:id', (0, auth_1.default)(constatnts_1.CON_SELLER_ROLE), DeleteCow_1.default);
exports.default = router;
