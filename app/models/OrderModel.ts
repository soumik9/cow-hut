import { Schema, Types, model } from 'mongoose';
import { IOrder } from '../../interfaces/modelTypes';

const orderSchema = new Schema<IOrder>({
    cow: {
        type: Types.ObjectId,
        ref: "Cow",
        required: [true, 'Cow id is required']
    },
    buyer: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'Buyer id is required']
    },
}, { timestamps: true });

const Order = model<IOrder>("Order", orderSchema);
export default Order;