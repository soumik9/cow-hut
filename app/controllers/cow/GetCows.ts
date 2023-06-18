import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { ICow } from '../../../interfaces/modelTypes';
import Cow from '../../models/CowModel';
import { cowFilterableFields, cowSearchableFields, paginationProps } from '../../../utils/constatnts';
import pick from '../../../utils/pick';
import calculatePagination from '../../../utils/helpers/calculatePagination';
import { SortOrder } from 'mongoose';

const GetCows: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const andConditions: any = [];
        const filters = pick(req.query, cowFilterableFields);
        const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

        // pagination and sorting
        const paginationOptions = pick(req.query, paginationProps);
        const { limit, page, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

        // sorting
        const sortConditions: { [key: string]: SortOrder } = {};
        if (sortBy && sortOrder) { sortConditions[sortBy] = sortOrder; }

        // if there is searching query
        if (searchTerm) {
            andConditions.push({
                $or: cowSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }

        // if any filterable query make it on object
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }

        // min & max query
        if (minPrice || maxPrice) {

            const conMinPrice = minPrice ? parseFloat(minPrice) : undefined;
            const conMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;

            if (conMinPrice && conMaxPrice) {
                andConditions.push({
                    $and: [{ price: { $gte: conMinPrice } }, { price: { $lte: conMaxPrice } }]
                });
            } else if (conMaxPrice) {
                andConditions.push({
                    $and: [{ price: { $lte: conMaxPrice } }]
                });
            } else if (conMinPrice) {
                andConditions.push({
                    $and: [{ price: { $gte: conMinPrice } }]
                });
            }
        }

        // finalizing the where condition
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
        // console.log(whereConditions);

        // get cows
        const result = await Cow.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
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