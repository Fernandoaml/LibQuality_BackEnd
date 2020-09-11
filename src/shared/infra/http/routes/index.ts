import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swagerDocument from '@shared/infra/services/swagger.json';

import repositoriesRouter from '@modules/issues/infra/http/routes/repositories.routes';

const routes = Router();

routes.use('/repositories', repositoriesRouter);
routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagerDocument));

export default routes;
