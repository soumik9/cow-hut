"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CreateAdmin_1 = __importDefault(require("../controllers/admin/CreateAdmin"));
const LoginAdmin_1 = __importDefault(require("../controllers/admin/LoginAdmin"));
const validateZodReq_1 = __importDefault(require("../middlewares/validateZodReq"));
const AdminLoginValidation_1 = __importDefault(require("../validations/AdminLoginValidation"));
//routes
router.post('/login', (0, validateZodReq_1.default)(AdminLoginValidation_1.default), LoginAdmin_1.default);
router.post('/create-admin', CreateAdmin_1.default);
exports.default = router;
