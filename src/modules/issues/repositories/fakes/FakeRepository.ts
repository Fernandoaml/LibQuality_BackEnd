import { v4 as uuidv4 } from 'uuid';

import IReporsitory from '../IRepository';
import ICreateInternalRepositoriesDTO from '../../dtos/ICreateInternalRepositoriesDTO';
import RepositoryEntities from '../../infra/typeorm/entities/Repository';

class RepoRepository implements IReporsitory {
  private repositories: RepositoryEntities[] = [];

  public async findRepositoryByName(
    name: string,
  ): Promise<RepositoryEntities | undefined> {
    const findRepository = this.repositories.find(
      repository => repository.fullName === name,
    );
    return findRepository;
  }

  public async create({
    idRepository,
    name,
    fullName,
    ownerLogin,
    ownerId,
    ownerAvatarUrl,
    htmlURL,
    createdAt,
    updatedAt,
    size,
    stargazersCount,
    watchersCount,
    language,
    forksCount,
    openIssuesCount,
  }: ICreateInternalRepositoriesDTO): Promise<RepositoryEntities> {
    const repository = new RepositoryEntities();

    Object.assign(repository, {
      id: uuidv4(),
    });
    // has two methods to make relationship.
    // repository.id = uuidv4();
    repository.idRepository = idRepository;
    repository.name = name;
    repository.fullName = fullName;
    repository.ownerLogin = ownerLogin;
    repository.ownerId = ownerId;
    repository.ownerAvatarUrl = ownerAvatarUrl;
    repository.htmlURL = htmlURL;
    repository.createdAt = createdAt;
    repository.updatedAt = updatedAt;
    repository.size = size;
    repository.stargazersCount = stargazersCount;
    repository.watchersCount = watchersCount;
    repository.language = language;
    repository.forksCount = forksCount;
    repository.openIssuesCount = openIssuesCount;

    this.repositories.push(repository);
    return repository;
  }
}

export default RepoRepository;
