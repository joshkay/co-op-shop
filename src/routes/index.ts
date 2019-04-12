import { Router } from 'express';
import user from './user';
import seed from './test/seed';

const routes = Router();

routes.use('/user', user);
if (process.env.NODE_ENV !== 'production')
{
  routes.use('/seed', seed);
}

export default routes;