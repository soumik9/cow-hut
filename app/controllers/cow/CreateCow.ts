import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';

const CreateCow: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new user
        const result = await Cow.create(req.body);

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow created successfully!',
            data: result,
        });
    }
)

export default CreateCow;