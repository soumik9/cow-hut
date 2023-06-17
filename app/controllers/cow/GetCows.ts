import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';
import { paginationProps } from '../../../utils/constatnts';
import pick from '../../../utils/pick';
import calculatePagination from '../../../utils/helpers/calculatePagination';

const GetCows: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // const filters = pick(req.query, academicDepartmentFilterableFields);
        const paginationOptions = pick(req.query, paginationProps);
        const { limit, page, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

        // get cows
        // const result = await Cow.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
        const result = await Cow.find().skip(skip).limit(limit);
        const totalRecords = await Cow.countDocuments();

        sendResponse<ICow[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cows retrieved successfully!',
            meta: {
                page,
                limit,
                total: totalRecords,
            },
            data: result,
        });
    }
)

export default GetCows;