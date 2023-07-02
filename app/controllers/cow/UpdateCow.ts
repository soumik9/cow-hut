import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';

const UpdateCow: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // updating specific cow data
        const result = await Cow.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true }
        );

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow updated successfully!',
            data: result,
        });
    }
)

export default UpdateCow;