import { Router } from 'express';
import user from './user';
import list from './list';
import seed from './test/seed';

const router = Router();

const apiRouter = Router();

apiRouter.use('/user', user);
apiRouter.use('/list', list);

if (process.env.NODE_ENV !== 'production')
{
  apiRouter.use('/seed', seed);
}

router.use('/api', apiRouter);

export default router;