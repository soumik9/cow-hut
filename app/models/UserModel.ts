import { Schema, model } from 'mongoose';
import { CUserRole } from '../../utils/constatnts';
import { IUser } from '../../interfaces/modelTypes';

const userSchema = new Schema<IUser>({
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
            values: CUserRole,
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

const User = model<IUser>("User", userSchema);
export default User;