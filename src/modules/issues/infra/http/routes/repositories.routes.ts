import { Router } from 'express';

import RepositoriesController from '@modules/issues/infra/http/controller/RepositoriesController';

const repositoryRouter = Router();
const repositoriesController = new RepositoriesController();

repositoryRouter.post('/', repositoriesController.index);

export default repositoryRouter;
