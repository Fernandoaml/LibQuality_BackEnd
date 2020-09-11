import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'date-fns';

import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import ICreateIssuesDTO from '@modules/issues/dtos/ICreateIssuesDTO';
import Issue from '@modules/issues/infra/typeorm/entities/Issue';

class IssuesRepository implements IIssuesRepository {
  private issuesRepository: Issue[] = [];

  public async findByRepositoryId(id: string): Promise<Issue[]> {
    const issues = this.issuesRepository.filter(issue => {
      return issue.repositoryId === id;
    });
    return issues;
  }

  public async findOneByRepositoryId(
    repositoryId: string,
    searchedDate: Date,
  ): Promise<Issue | undefined> {
    const findOneIssue = this.issuesRepository.find(
      issue =>
        isEqual(issue.searchedDate, searchedDate) &&
        issue.repositoryId === repositoryId,
    );
    return findOneIssue;
  }

  public async create({
    issuesTotal,
    repositoryId,
    oldestIssue,
    newestIssue,
    searchedDate,
    deviationOfIssue,
    meanOfIssue,
  }: ICreateIssuesDTO): Promise<Issue> {
    const issue = new Issue();
    Object.assign(issue, {
      id: uuidv4(),
      issuesTotal,
      repositoryId,
      oldestIssue,
      newestIssue,
      searchedDate,
      deviationOfIssue,
      meanOfIssue,
    });
    this.issuesRepository.push(issue);
    return issue;
  }
}

export default IssuesRepository;
