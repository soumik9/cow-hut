"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    role: {
        type: String,
        enum: {
            values: ['admin'],
            message: `Status value can not be {VALUE}, must be admin`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
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
    address: {
        type: String,
        required: [true, 'Address is required']
    },
}, { timestamps: true });
// checking is admin exists
adminSchema.statics.isUserExist = function (param) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = {
            $or: [{ phoneNumber: param }],
        };
        // Check if param is a valid ObjectId
        if (mongoose_1.default.Types.ObjectId.isValid(param)) {
            query.$or.push({ _id: param });
        }
        return yield this.findOne(query).select('role password').exec();
    });
};
// checking is password matched
adminSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// password hashing before saving or creating
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        const password = this.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
        this.password = hashedPassword;
        next();
    });
});
// Exclude password field from response
adminSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
    }
});
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
