import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRepositoryService from '@modules/issues/services/CreateRepositoryService';

import GetRepositoryIssuesService from '@modules/issues/services/GetRepositoryIssuesService';

export default class RepositoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { repoName } = request.body;

    const createRepository = container.resolve(CreateRepositoryService);
    const getRepositoryIssues = container.resolve(GetRepositoryIssuesService);

    const repository = await createRepository.execute(repoName);
    const issuesData = {
      issuesCount: repository.openIssuesCount,
      repositoryId: repository.id,
    };

    const issueData = await getRepositoryIssues.execute({
      repoName,
      issuesData,
    });

    return response.json({ repository, issueData });
  }
}
