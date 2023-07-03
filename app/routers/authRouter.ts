import express from 'express'
const router = express.Router();

import validateZodRequest from '../middlewares/validateZodReq';
import RefreshTokenValidation from '../validations/RefreshTokenValidation';
import RefreshToken from '../controllers/auth/RefreshToken';
import AdminLoginValidation from '../validations/AdminLoginValidation';
import LoginUser from '../controllers/auth/LoginUser';
import UserSignup from '../controllers/auth/UserSignup';

//routes
router.post('/signup', UserSignup);
router.post('/login', validateZodRequest(AdminLoginValidation), LoginUser);
router.post('/refresh-token', validateZodRequest(RefreshTokenValidation), RefreshToken);

export default router;