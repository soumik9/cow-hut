import express from 'express'
const router = express.Router();

import GetCow from '../controllers/cow/GetCow';
import GetCows from '../controllers/cow/GetCows';
import UpdateCow from '../controllers/cow/UpdateCow';
import DeleteCow from '../controllers/cow/DeleteCow';
import CreateCow from '../controllers/cow/CreateCow';

//routes
router.post('/', CreateCow);
// router.get('/:id', GetCow);
router.get('/', GetCows);
router.patch('/:id', UpdateCow);
router.delete('/:id', DeleteCow);

export default router;