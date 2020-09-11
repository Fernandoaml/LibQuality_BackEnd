// import { parseISO, differenceInDays } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import { standardDeviation, mean } from 'math-stats';
import { startOfDay, differenceInDays, parseISO } from 'date-fns';

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

  public async execute({
    repoName,
    issuesData,
  }: IRequestDTO): Promise<Issue | Issue[] | undefined> {
    const searchedDate = startOfDay(new Date());

    const [checkIssueDataFromDay, getIssuesData] = await Promise.all([
      this.IssuesRepository.findOneByRepositoryId(
        issuesData.repositoryId,
        searchedDate,
      ),
      this.IssuesRepository.findByRepositoryId(issuesData.repositoryId),
    ]);

    if (checkIssueDataFromDay && getIssuesData) {
      return getIssuesData;
    }

    const totalPages = Math.ceil(issuesData.issuesCount / 100);
    const listWithLenght = new Array(totalPages).fill(undefined);

    const listOfIssuesRAW = await Promise.all(
      listWithLenght.map((_, page) =>
        api.get<IIssueDTO[]>(
          `repos/${repoName}/issues?state=open&per_page=100&page=${page}`,
        ),
      ),
    );
    const [oldestIssue, newestIssue] = await Promise.all([
      api.get<IIssueDTO[]>(
        `repos/${repoName}/issues?state=open&per_page=1&sort=created&direction=asc`,
      ),
      api.get<IIssueDTO[]>(
        `repos/${repoName}/issues?state=open&per_page=1&sort=created&direction=desc`,
      ),
    ]);
    if (listOfIssuesRAW.length !== 0) {
      const listOfIssuesOK: IIssueDTO[] = [];
      listOfIssuesRAW.forEach(page => {
        listOfIssuesOK.push(...page.data);
      });
      const daysOfIssuesOpen: number[] = listOfIssuesOK.map(opened =>
        differenceInDays(searchedDate, parseISO(opened.created_at)),
      );

      const oldDateIssue = parseISO(oldestIssue.data[0].created_at);
      const newestDateIssue = parseISO(newestIssue.data[0].created_at);
      const meanOfIssuesOpen = mean(daysOfIssuesOpen);
      const deviationOfIssuesOpen = standardDeviation(daysOfIssuesOpen);

      const issues = await this.IssuesRepository.create({
        issuesTotal: issuesData.issuesCount,
        repositoryId: issuesData.repositoryId,
        oldestIssue: oldDateIssue,
        newestIssue: newestDateIssue,
        deviationOfIssue: deviationOfIssuesOpen,
        meanOfIssue: meanOfIssuesOpen,
        searchedDate,
      });
      return issues;
    }
    return undefined;
  }
}

export default GetRepositoryIssuesService;
