import { Router } from 'express';
import ItemController from '../controllers/itemController';
import ListController from '../controllers/listController';
import { ensureAuthenticated } from '../middlewares/jwt';

const router = Router({ mergeParams: true });

const itemController = new ItemController();
const listController = new ListController();

// Create a new item
router.post('/',
  ensureAuthenticated,
  listController.handleListParam,
  itemController.create
);

// Get all items for a list
router.get('/',
  ensureAuthenticated,
  listController.handleListParam,
  itemController.getAllForList
);

// Delete an item from a list
router.delete('/:itemId',
  ensureAuthenticated,
  listController.handleListParam,
  itemController.handleItemParam,
  itemController.delete
);

// Update an item from a list
router.patch('/:itemId',
  ensureAuthenticated,
  listController.handleListParam,
  itemController.handleItemParam,
  itemController.update
);

export default router;