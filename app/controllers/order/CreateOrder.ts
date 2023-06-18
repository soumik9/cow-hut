import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IOrder } from '../../../interfaces/modelTypes';
import Order from '../../models/OrderModel';
import User from '../../models/UserModel';
import ApiError from '../../../utils/errors/ApiError';
import Cow from '../../models/CowModel';
import mongoose from 'mongoose';
import { CLabel, CUserRole } from '../../../utils/constatnts';

const CreateOrder: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const buyer = req.body.buyer;
    const cow = req.body.cow;
    let orderId;

    // check if the request is from a buyer or not
    const buyerData = await User.findById(buyer).select('role budget');
    if (buyerData?.role !== CUserRole[1]) throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a registered buyer!');

    // check if the cow is already sold out or not
    const cowData = await Cow.findById(cow).select('label price seller');
    if (cowData?.label === CLabel[1]) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is already sold out!');

    // check if the buyer has enough money to buy the cow... if not, send an error with a message
    if (cowData && cowData.price && cowData.price > buyerData.budget) throw new ApiError(httpStatus.BAD_REQUEST, 'Budget is too low!');

    // if the buyer has enough money, process the transaction here
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1. update cow label to sold out
        await Cow.findOneAndUpdate({ _id: cow }, { label: CLabel[1] }, { new: true }).session(session);

        if (cowData) {
            // 2. deduct cow cost from buyer's account
            const updatedBudget = buyerData.budget - cowData.price;
            await User.findOneAndUpdate({ _id: buyer }, { budget: updatedBudget }, { new: true }).session(session);

            // 3. add the cow price as income to the seller's account
            await User.findOneAndUpdate({ _id: cowData.seller }, { $inc: { income: cowData.price } }, { new: true }).session(session);
        }

        // 4. create order data
        const result = await Order.create([req.body], { session: session });
        orderId = result[0]._id;

        // commit and end the transaction
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        // if any error occurs, abort the transaction and handle the error
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    // retrieve the populated order data
    const order = await Order.findById(orderId)
        .populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'User',
            },
        })
        .populate('buyer');

    sendResponse<IOrder>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created successfully!',
        data: order,
    });
});


export default CreateOrder;