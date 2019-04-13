import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

const userController = new UserController();

// Create a new user
router.post('/',
  userController.create
);

// Login as user
router.post('/login',
  userController.login
);

export default router;