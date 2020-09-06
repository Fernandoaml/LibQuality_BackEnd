import { getRepository } from 'typeorm';
import { parseISO, differenceInDays } from 'date-fns';

import ICreateIssuesDTO from '../dtos/ICreateIssuesDTO';
import Issue from '../models/Issue';
import api from '../assets/gitHubApiRepos';

interface IRequestDTO {
  repoName: string;
  issuesCount: number;
}
interface IIssueDTO {
  created_at: string;
  updated_at: string;
}

class GetRepositoryIssuesService {
  public async execute({ repoName, issuesCount }: IRequestDTO): Promise<Issue> {
    const projectRepository = getRepository(Issue);
    const actualDate = new Date();
    const newestIssue = await api.get<IIssueDTO[]>(
      `repos/${repoName}/issues?state=open&per_page=1&sort=created`,
    );

    const oldestIssue = await api.get<IIssueDTO[]>(
      `repos/${repoName}/issues?state=open&per_page=1&sort=created&direction=asc`,
    );
    const oldDateIssue = parseISO(oldestIssue.data[0].created_at);
    const newestDateIssue = parseISO(newestIssue.data[0].created_at);

    const issues = projectRepository.create({
      issuesTotal: issuesCount,
      oldestIssue: oldDateIssue,
      newestIssue: newestDateIssue,
      todayDate: actualDate,
    });
    await projectRepository.save(issues);
    return issues;
  }
}

export default GetRepositoryIssuesService;
