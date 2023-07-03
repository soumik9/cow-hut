import { Request, Response, RequestHandler } from 'express';
import User from '../../models/UserModel';
import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/SendResponse';
import { IUser } from '../../../interfaces/modelTypes';
import bcrypt from 'bcrypt';

const UpdateProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {

        const data = { ...req.body };

        // Check if the password is being updated
        if (data.password) {
            data.password = req.body.password;
            const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS));
            data.password = hashedPassword;
        }

        // updating specific user
        const result = await User.findOneAndUpdate({ _id: req.user?._id },
            data,
            { new: true }
        );

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
)

export default UpdateProfile;