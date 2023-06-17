import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';
import { cowFilterableFields, paginationProps } from '../../../utils/constatnts';
import pick from '../../../utils/pick';
import calculatePagination from '../../../utils/helpers/calculatePagination';
import { SortOrder } from 'mongoose';

const GetCows: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // const filters = pick(req.query, cowFilterableFields);
        const paginationOptions = pick(req.query, paginationProps);
        const { limit, page, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

        // const andConditions = [];

        const sortConditions: { [key: string]: SortOrder } = {};
        // const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }

        // get cows
        // const result = await Cow.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
        const result = await Cow.find().sort(sortConditions).skip(skip).limit(limit);
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