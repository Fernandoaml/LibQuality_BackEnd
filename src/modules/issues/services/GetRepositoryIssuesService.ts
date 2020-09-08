// import { parseISO, differenceInDays } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import { standardDeviation, mean } from 'math-stats';
import { differenceInDays, parseISO } from 'date-fns';

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

    const totalPages = Math.ceil(issuesData.issuesCount / 100);
    const listWithLenght = new Array(totalPages).fill(undefined);

    const listOfIssuesRAW = await Promise.all(
      listWithLenght.map((_, page) =>
        api.get<IIssueDTO[]>(
          `repos/${repoName}/issues?state=open&per_page=100&page=${page}`,
        ),
      ),
    );
    const listOfIssuesOK: any[] = [];
    listOfIssuesRAW.forEach(page => {
      listOfIssuesOK.push(...page.data);
    });
    const daysOfIssuesOpen = listOfIssuesOK.map(opened =>
      differenceInDays(searchedDate, parseISO(opened.created_at)),
    );
    const meanOfIssuesOpen = mean(daysOfIssuesOpen);
    const deviationOfIssuesOpen = standardDeviation(daysOfIssuesOpen);
  }
}

export default GetRepositoryIssuesService;
