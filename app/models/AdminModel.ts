import mongoose, { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from '../../interfaces/modelTypes';
import bcrypt from 'bcrypt';

const adminSchema = new Schema<IAdmin, AdminModel, {}>({
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
adminSchema.statics.isUserExist = async function (param: string): Promise<Partial<IAdmin> | null> {
    let query: { $or: ({ _id: string } | { phoneNumber: string })[] } = {
        $or: [{ phoneNumber: param }],
    };

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
        query.$or.push({ _id: param });
    }

    return await this.findOne(query).select('role password').exec();
}

// checking is password matched
adminSchema.statics.isPasswordMatched = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

// password hashing before saving or creating
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const password = this.password;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    this.password = hashedPassword;

    next();
});

// Exclude password field from response
adminSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
    }
});

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
export default Admin;