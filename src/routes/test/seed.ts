import { Router } from 'express';
import SeedController from '../../controllers/test/seedController';

const router = Router();

const seedController = new SeedController();

router.post('/sync',
  seedController.sync
);

router.post('/user',
  seedController.user
);

router.post('/list',
  seedController.list
);

export default router;