import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IOrder } from '../../../interfaces/modelTypes';
import Order from '../../models/OrderModel';
import { CON_BUYER_ROLE, CON_SELLER_ROLE } from '../../../utils/constatnts';
import ApiError from '../../../utils/errors/ApiError';

const GetOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {

        const id = req.user?._id;
        const role = req.user?.role;

        // getting new user
        const result = await Order.findOne({ _id: req.params.id }).populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'User'
            }
        }).populate('buyer');

        if (role === CON_BUYER_ROLE) {
            if (String(result?.buyer._id) !== id) {
                throw new ApiError(httpStatus.NOT_FOUND, 'You have not access!')
            }
        } else if (role === CON_SELLER_ROLE) {
            // @ts-ignore
            if (String(result?.cow.seller._id) !== id) {
                throw new ApiError(httpStatus.NOT_FOUND, 'You have not access!')
            }
        }

        sendResponse<IOrder>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrieved successfully!',
            data: result,
        });
    }
)

export default GetOrder;