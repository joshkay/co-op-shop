import { Router } from 'express';
import ListController from '../controllers/listController';
import { ensureAuthenticated } from '../middlewares/jwt';

const router = Router();

const listController = new ListController();

// Create a new user
router.post('/',
  ensureAuthenticated,
  listController.create
);

// Login as user
router.get('/',
  ensureAuthenticated,
  listController.getAllForUser
);

export default router;