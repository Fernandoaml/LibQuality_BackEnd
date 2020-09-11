import { getRepository, Repository as OrmRepository } from 'typeorm';

import IReporsitory from '@modules/issues/repositories/IRepository';
import ICreateInternalRepositoriesDTO from '@modules/issues/dtos/ICreateInternalRepositoriesDTO';
import RepositoryEntities from '@modules/issues/infra/typeorm/entities/Repository';

class RepoRepository implements IReporsitory {
  private ormRepository: OrmRepository<RepositoryEntities>;

  constructor() {
    this.ormRepository = getRepository(RepositoryEntities);
  }

  public async findRepositoryByName(
    name: string,
  ): Promise<RepositoryEntities | undefined> {
    const findRepository = await this.ormRepository.findOne({
      where: { fullName: name },
    });
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
    const repository = this.ormRepository.create({
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
    });
    await this.ormRepository.save(repository);
    return repository;
  }
}

export default RepoRepository;
