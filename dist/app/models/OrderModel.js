"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Types.ObjectId,
        ref: "Cow",
        required: [true, 'Cow id is required']
    },
    buyer: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, 'Buyer id is required']
    },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
