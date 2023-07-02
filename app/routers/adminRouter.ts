import express from 'express'
const router = express.Router();

import CreateAdmin from '../controllers/admin/CreateAdmin';
import LoginAdmin from '../controllers/admin/LoginAdmin';
import validateZodRequest from '../middlewares/validateZodReq';
import AdminLoginValidation from '../validations/AdminLoginValidation';

//routes
router.post('/login', validateZodRequest(AdminLoginValidation), LoginAdmin);
router.post('/create-admin', CreateAdmin);

export default router;