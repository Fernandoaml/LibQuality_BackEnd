import { Router } from 'express';

import repositoriesRouter from '@modules/issues/infra/http/routes/repositories.routes';

const routes = Router();

routes.use('/repositories', repositoriesRouter);

export default routes;
