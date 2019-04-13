import { Router } from 'express';
import ListController from '../controllers/listController';
import { ensureAuthenticated } from '../middlewares/jwt';
import item from './item';

const router = Router();

const listController = new ListController();

// Create a new list
router.post('/',
  ensureAuthenticated,
  listController.create
);

// Get all lists
router.get('/',
  ensureAuthenticated,
  listController.getAllForUser
);

router.use('/:listId/item', item);

export default router;