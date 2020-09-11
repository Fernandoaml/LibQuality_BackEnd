import Issue from '@modules/issues/infra/typeorm/entities/Issue';
import ICreateIssuesDTO from '@modules/issues/dtos/ICreateIssuesDTO';

export default interface IIssuesRepository {
  create(data: ICreateIssuesDTO): Promise<Issue>;
  findByRepositoryId(repositoryId: string): Promise<Issue[]>;
  findOneByRepositoryId(
    repositoryId: string,
    searchedDate: Date,
  ): Promise<Issue | undefined>;
}
