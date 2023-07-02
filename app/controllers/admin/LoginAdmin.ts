import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import ApiError from '../../../utils/errors/ApiError';
import Admin from '../../models/AdminModel';
import createToken from '../../../utils/helpers/createToken';
import { Secret } from 'jsonwebtoken';
import { ILoginResponse } from '../../../interfaces/types';

const LoginAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const phoneNumber = req.body.phoneNumber;
        const password = req.body.password;

        // checking is admin exists
        const isAdminExist = await Admin.isUserExist(phoneNumber);
        if (!isAdminExist) throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');

        // checking is password valid
        if (isAdminExist.password && !(await Admin.isPasswordMatched(password, isAdminExist.password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
        }

        // destructing 
        const { _id, role } = isAdminExist;

        // creating accesstoken & refreshtoken
        const accessToken = createToken({ _id, role }, process.env.JWT_SECRET as Secret, process.env.JWT_EXPIRES_IN as string);
        const refreshToken = createToken({ _id, role }, process.env.JWT_REFRESH_SECRET as Secret, process.env.JWT_REFRESH_EXPIRES_IN as string);

        // set refresh token into cookie
        const cookieOptions = {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        sendResponse<ILoginResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Admin logged in successfully!',
            data: {
                accessToken,
            }
        });
    }
)

export default LoginAdmin;