"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constatnts_1 = require("../../utils/constatnts");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: {
            values: constatnts_1.CUserRole,
            message: "Status value can not be {VALUE}, must be seller/buyer"
        },
        required: [true, 'Role is required']
    },
    budget: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
