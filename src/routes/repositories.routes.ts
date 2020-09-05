import { Router } from 'express';
import CreateRepositoryService from '../services/CreateRepositoryService';

const repositoryRouter = Router();

repositoryRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const createRepository = new CreateRepositoryService();
    const repository = await createRepository.execute({ name });

    return response.json(repository);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default repositoryRouter;
