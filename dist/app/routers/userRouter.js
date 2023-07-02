"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const GetUsers_1 = __importDefault(require("../controllers/user/GetUsers"));
const GetUser_1 = __importDefault(require("../controllers/user/GetUser"));
const UpdateUser_1 = __importDefault(require("../controllers/user/UpdateUser"));
const DeleteUser_1 = __importDefault(require("../controllers/user/DeleteUser"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
//routes
router.get('/:id', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE), GetUser_1.default);
router.get('/', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE), GetUsers_1.default);
router.patch('/:id', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE), UpdateUser_1.default);
router.delete('/:id', (0, auth_1.default)(constatnts_1.CON_ADMIN_ROLE), DeleteUser_1.default);
exports.default = router;
