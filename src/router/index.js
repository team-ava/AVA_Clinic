import {Router} from 'express';
import UserController from '../controllers/user_controller.js';

export const router = Router();
const userController = new UserController();

router.post('/user', userController.create);