"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/SendResponse"));
const OrderModel_1 = __importDefault(require("../../models/OrderModel"));
const constatnts_1 = require("../../../utils/constatnts");
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const GetOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    // getting new user
    const result = yield OrderModel_1.default.findOne({ _id: req.params.id }).populate({
        path: 'cow',
        populate: {
            path: 'seller',
            model: 'User'
        }
    }).populate('buyer');
    if (role === constatnts_1.CON_BUYER_ROLE) {
        if (String(result === null || result === void 0 ? void 0 : result.buyer._id) !== id) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You have not access!');
        }
    }
    else if (role === constatnts_1.CON_SELLER_ROLE) {
        // @ts-ignore
        if (String(result === null || result === void 0 ? void 0 : result.cow.seller._id) !== id) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You have not access!');
        }
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: result,
    });
}));
exports.default = GetOrder;
