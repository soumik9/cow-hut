import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';

const DeleteCow: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // deleting specific cow
        const result = await Cow.findByIdAndDelete(req.params.id);

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow deleted successfully!',
            data: result,
        });
    }
)

export default DeleteCow;