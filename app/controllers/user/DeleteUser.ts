import { Request, Response, RequestHandler } from 'express';
import User from '../../models/UserModel';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IUser } from '../../../interfaces/modelTypes';

const DeleteUser: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {

        // deleting specific user
        const result = await User.findByIdAndDelete(req.params.id);

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    }
)

export default DeleteUser;