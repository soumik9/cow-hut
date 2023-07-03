import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IOrder } from '../../../interfaces/modelTypes';
import Order from '../../models/OrderModel';

const GetOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {

        // creating new user
        const result = await Order.findById(req.params.id).populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'User'
            }
        }).populate('buyer');

        sendResponse<IOrder>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrieved successfully!',
            data: result,
        });
    }
)

export default GetOrder;