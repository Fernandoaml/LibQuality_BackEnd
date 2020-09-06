import { getRepository } from 'typeorm';

import ICreateRepositoriesDTO from '../dtos/ICreateRepositoriesDTO';
import Repository from '../models/Repository';
import api from '../assets/gitHubApiRepos';

class CreateRepositoryService {
  public async execute(repoName: string): Promise<Repository> {
    const projectRepository = getRepository(Repository);

    // const checkRepositoryExists = await projectRepository.findOne({
    //   where: { fullName: RepoName },
    // });

    // if (checkRepositoryExists) {
    //   throw new Error('This repository already existis on Database.');
    // }

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

    const repository = projectRepository.create({
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
    await projectRepository.save(repository);
    return repository;
  }
}

export default CreateRepositoryService;
