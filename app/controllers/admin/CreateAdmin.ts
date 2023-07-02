import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IAdmin } from '../../../interfaces/modelTypes';
import Admin from '../../models/AdminModel';

const CreateAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new user
        const result = await Admin.create(req.body);

        sendResponse<IAdmin>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Admin created successfully!',
            data: result,
        });
    }
)

export default CreateAdmin;