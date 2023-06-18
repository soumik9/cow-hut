import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IOrder } from '../../../interfaces/modelTypes';
import Order from '../../models/OrderModel';

const GetOrders: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all orders
        const result = await Order.find().populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'User'
            }
        }).populate('buyer');

        sendResponse<IOrder[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cows retrieved successfully!',
            data: result,
        });
    }
)

export default GetOrders;