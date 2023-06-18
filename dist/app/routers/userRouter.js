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
//routes
router.get('/:id', GetUser_1.default);
router.get('/', GetUsers_1.default);
router.patch('/:id', UpdateUser_1.default);
router.delete('/:id', DeleteUser_1.default);
exports.default = router;
