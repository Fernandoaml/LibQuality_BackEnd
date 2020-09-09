import { getRepository, Repository } from 'typeorm';

import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import ICreateIssuesDTO from '@modules/issues/dtos/ICreateIssuesDTO';
import Issue from '@modules/issues/infra/typeorm/entities/Issue';

class IssuesRepository implements IIssuesRepository {
  private ormRepository: Repository<Issue>;

  constructor() {
    this.ormRepository = getRepository(Issue);
  }

  public async findByRepositoryId(repositoryId: string): Promise<Issue[]> {
    const findIssues = await this.ormRepository.find({
      where: { repositoryId },
    });
    return findIssues;
  }

  public async findOneByRepositoryId(
    repositoryId: string,
    searchedDate: Date,
  ): Promise<Issue | undefined> {
    const findIssues = await this.ormRepository.findOne({
      repositoryId,
      searchedDate,
    });

    return findIssues;
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
    const issue = this.ormRepository.create({
      issuesTotal,
      repositoryId,
      oldestIssue,
      newestIssue,
      deviationOfIssue,
      meanOfIssue,
      searchedDate,
    });

    await this.ormRepository.save(issue);
    return issue;
  }
}

export default IssuesRepository;
