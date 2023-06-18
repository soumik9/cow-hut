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
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const CowModel_1 = __importDefault(require("../../models/CowModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const constatnts_1 = require("../../../utils/constatnts");
const CreateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = req.body.buyer;
    const cow = req.body.cow;
    let orderId;
    // check if the request is from a buyer or not
    const buyerData = yield UserModel_1.default.findById(buyer).select('role budget');
    if ((buyerData === null || buyerData === void 0 ? void 0 : buyerData.role) !== constatnts_1.CUserRole[1])
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not a registered buyer!');
    // check if the cow is already sold out or not
    const cowData = yield CowModel_1.default.findById(cow).select('label price seller');
    if ((cowData === null || cowData === void 0 ? void 0 : cowData.label) === constatnts_1.CLabel[1])
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow is already sold out!');
    // check if the buyer has enough money to buy the cow... if not, send an error with a message
    if (cowData && cowData.price && cowData.price > buyerData.budget)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Budget is too low!');
    // if the buyer has enough money, process the transaction here
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 1. update cow label to sold out
        yield CowModel_1.default.findOneAndUpdate({ _id: cow }, { label: constatnts_1.CLabel[1] }, { new: true }).session(session);
        if (cowData) {
            // 2. deduct cow cost from buyer's account
            const updatedBudget = buyerData.budget - cowData.price;
            yield UserModel_1.default.findOneAndUpdate({ _id: buyer }, { budget: updatedBudget }, { new: true }).session(session);
            // 3. add the cow price as income to the seller's account
            yield UserModel_1.default.findOneAndUpdate({ _id: cowData.seller }, { $inc: { income: cowData.price } }, { new: true }).session(session);
        }
        // 4. create order data
        const result = yield OrderModel_1.default.create([req.body], { session: session });
        orderId = result[0]._id;
        // commit and end the transaction
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        // if any error occurs, abort the transaction and handle the error
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    // retrieve the populated order data
    const order = yield OrderModel_1.default.findById(orderId)
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
            model: 'User',
        },
    })
        .populate('buyer');
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully!',
        data: order,
    });
}));
exports.default = CreateOrder;
