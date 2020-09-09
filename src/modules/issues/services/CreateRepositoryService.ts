import { injectable, inject } from 'tsyringe';

import ICreateRepositoriesDTO from '@modules/issues/dtos/ICreateRepositoriesDTO';
import IRepository from '@modules/issues/repositories/IRepository';
import Repository from '@modules/issues/infra/typeorm/entities/Repository';
import api from '@shared/infra/services/gitHubApiRepos';

@injectable()
class CreateRepositoryService {
  constructor(
    @inject('Repository')
    private repository: IRepository,
  ) {}

  public async execute(repoName: string): Promise<Repository> {
    const checkRepositoryExists = await this.repository.findRepositoryByName(
      repoName,
    );

    if (checkRepositoryExists) {
      return checkRepositoryExists;
    }

    const response = await api.get<ICreateRepositoriesDTO>(`repos/${repoName}`);

    const {
      id,
      name,
      full_name,
      owner,
      html_url,
      created_at,
      updated_at,
      size,
      stargazers_count,
      watchers_count,
      language,
      forks_count,
      open_issues_count,
    } = response.data;

    const repository = await this.repository.create({
      idRepository: id,
      name,
      fullName: full_name,
      ownerLogin: owner.login,
      ownerId: owner.id,
      ownerAvatarUrl: owner.avatar_url,
      htmlURL: html_url,
      createdAt: created_at,
      updatedAt: updated_at,
      size,
      stargazersCount: stargazers_count,
      watchersCount: watchers_count,
      language,
      forksCount: forks_count,
      openIssuesCount: open_issues_count,
    });
    return repository;
  }
}

export default CreateRepositoryService;
