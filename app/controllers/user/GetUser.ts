import { Request, Response, RequestHandler } from 'express';
import User from '../../models/UserModel';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IUser } from '../../../interfaces/modelTypes';

const GetUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new user
        const result = await User.findById(req.params.id);

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrieved successfully!',
            data: result,
        });
    }
)

export default GetUser;