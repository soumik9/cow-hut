"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constatnts_1 = require("../../utils/constatnts");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Cow name is required']
    },
    age: {
        type: Number,
        required: [true, 'Cow age is required']
    },
    price: {
        type: Number,
        required: [true, 'Cow price is required']
    },
    location: {
        type: String,
        enum: {
            values: constatnts_1.CLocation,
            message: `Status value can not be {VALUE}, must be ${constatnts_1.CLocation.map((l) => l + `/`)}`
        },
    },
    breed: {
        type: String,
        required: [true, 'Cow breed is required']
    },
    weight: {
        type: Number,
        required: [true, 'Cow weight is required in kilogram']
    },
    label: {
        type: String,
        enum: {
            values: constatnts_1.CLabel,
        },
        default: constatnts_1.CLabel[0]
    },
    category: {
        type: String,
        enum: {
            values: constatnts_1.CCowCategory,
            message: `Status value can not be {VALUE}, must be ${constatnts_1.CLocation.map((l) => l + `/`)}`
        },
    },
    seller: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, 'Seller id is required']
    },
}, { timestamps: true });
const Cow = (0, mongoose_1.model)("Cow", cowSchema);
exports.default = Cow;
