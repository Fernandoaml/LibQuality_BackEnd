// import { parseISO, differenceInDays } from 'date-fns';
import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Issue from '@modules/issues/infra/typeorm/entities/Issue';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import api from '@shared/infra/services/gitHubApiRepos';

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
@injectable()
class GetRepositoryIssuesService {
  constructor(
    @inject('IssuesRepository')
    private IssuesRepository: IIssuesRepository,
  ) {}

  public async execute({ repoName, issuesData }: IRequestDTO): Promise<Issue> {
    const searchedDate = new Date();

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

    const issues = await this.IssuesRepository.create({
      issuesTotal: issuesData.issuesCount,
      repositoryId: issuesData.repositoryId,
      oldestIssue: oldDateIssue,
      newestIssue: newestDateIssue,
      searchedDate,
    });
    return issues;
  }
}

export default GetRepositoryIssuesService;
