"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validateZodReq_1 = __importDefault(require("../middlewares/validateZodReq"));
const RefreshTokenValidation_1 = __importDefault(require("../validations/RefreshTokenValidation"));
const RefreshToken_1 = __importDefault(require("../controllers/auth/RefreshToken"));
const AdminLoginValidation_1 = __importDefault(require("../validations/AdminLoginValidation"));
const LoginUser_1 = __importDefault(require("../controllers/auth/LoginUser"));
const Signup_1 = __importDefault(require("../controllers/auth/Signup"));
//routes
router.post('/signup', Signup_1.default);
router.post('/login', (0, validateZodReq_1.default)(AdminLoginValidation_1.default), LoginUser_1.default);
router.post('/refresh-token', (0, validateZodReq_1.default)(RefreshTokenValidation_1.default), RefreshToken_1.default);
exports.default = router;
