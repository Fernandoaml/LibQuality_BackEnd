import { Router } from 'express';

import CreateRepositoryService from '../services/CreateRepositoryService';
import GetRepositoryIssuesService from '../services/GetRepositoryIssuesService';

const repositoryRouter = Router();

repositoryRouter.post('/', async (request, response) => {
  try {
    const { repoName } = request.body;
    const createRepository = new CreateRepositoryService();
    const repository = await createRepository.execute(repoName);
    const issuesCount = repository.openIssuesCount;
    const getRepositoryIssues = new GetRepositoryIssuesService();
    const issueData = await getRepositoryIssues.execute({
      repoName,
      issuesCount,
    });

    return response.json({ repository, issueData });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default repositoryRouter;
