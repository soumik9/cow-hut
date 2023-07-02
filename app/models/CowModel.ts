import { Schema, Types, model } from 'mongoose';
import { CCowCategory, CLabel, CLocation } from '../../utils/constatnts';
import { ICow } from '../../interfaces/modelTypes';

const cowSchema = new Schema<ICow>({
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
            values: CLocation,
            message: `Status value can not be {VALUE}, must be ${CLocation.map((l: string) => l + `/`)}`
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
            values: CLabel,
        },
        default: CLabel[0]
    },
    category: {
        type: String,
        enum: {
            values: CCowCategory,
            message: `Status value can not be {VALUE}, must be ${CLocation.map((l: string) => l + `/`)}`
        },
    },
    seller: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'Seller id is required']
    },
}, { timestamps: true });

const Cow = model<ICow>("Cow", cowSchema);
export default Cow;