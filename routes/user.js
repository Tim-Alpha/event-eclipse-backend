import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

router.use(userController);

export default router;
