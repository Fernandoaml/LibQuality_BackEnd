import { getRepository } from 'typeorm';
import { parseISO, differenceInDays } from 'date-fns';

import Issue from '../models/Issue';
import api from './gitHubApiRepos';

interface IIssueDataDTO {
  issuesCount: number;
  repositoryId: string;
}

interface IRequestDTO {
  repoName: string;
  issuesData: IIssueDataDTO;
}

interface IIssueDTO {
  created_at: string;
  updated_at: string;
}

class GetRepositoryIssuesService {
  public async execute({ repoName, issuesData }: IRequestDTO): Promise<Issue> {
    const projectRepository = getRepository(Issue);
    const actualDate = new Date();

    const [newestIssue, oldestIssue] = await Promise.all([
      api.get<IIssueDTO[]>(
        `repos/${repoName}/issues?state=open&per_page=1&sort=created`,
      ),
      api.get<IIssueDTO[]>(
        `repos/${repoName}/issues?state=open&per_page=1&sort=created&direction=asc`,
      ),
    ]);
    const oldDateIssue = parseISO(oldestIssue.data[0].created_at);
    const newestDateIssue = parseISO(newestIssue.data[0].created_at);

    const issues = projectRepository.create({
      issuesTotal: issuesData.issuesCount,
      repositoryId: issuesData.repositoryId,
      oldestIssue: oldDateIssue,
      newestIssue: newestDateIssue,
      searchedDate: actualDate,
    });
    await projectRepository.save(issues);
    return issues;
  }
}

export default GetRepositoryIssuesService;
