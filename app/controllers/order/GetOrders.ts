import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IOrder } from '../../../interfaces/modelTypes';
import Order from '../../models/OrderModel';
import { CON_BUYER_ROLE, CON_SELLER_ROLE } from '../../../utils/constatnts';

const GetOrders: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.user?._id;
        const role = req.user?.role;
        let result;

        if (role === CON_SELLER_ROLE) {
            // get specific seller orders
            const datas = await Order.find().populate({
                path: 'cow',
                populate: {
                    path: 'seller',
                    model: 'User'
                }
            }).populate('buyer');
            //@ts-ignore
            result = datas.filter((item) => String(item.cow.seller._id) === id)
        } else if (role === CON_BUYER_ROLE) {
            // get specific buyer orders
            result = await Order.find({ buyer: id }).populate({
                path: 'cow',
                populate: {
                    path: 'seller',
                    model: 'User'
                }
            }).populate('buyer');
        } else {
            // get all orders
            result = await Order.find().populate({
                path: 'cow',
                populate: {
                    path: 'seller',
                    model: 'User'
                }
            }).populate('buyer');
        }

        sendResponse<IOrder[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Orders retrieved successfully!',
            data: result,
            meta: {
                total: result.length,
            },
        });
    }
)

export default GetOrders;