import { injectable, inject } from 'tsyringe';
import { parseISO, startOfDay } from 'date-fns';
import amqp from 'amqplib';

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
    const created_at = parseISO(response.data.created_at);
    const updated_at = parseISO(response.data.updated_at);
    const {
      id,
      name,
      full_name,
      owner,
      html_url,
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
    const rabbitData = {
      repositoryId: repository.id,
      fullName: repository.fullName,
      createdAt: startOfDay(new Date()),
    };
    console.log(rabbitData);
    const rabbit = async () => {
      const connection = await amqp.connect('amqp://guest:guest@localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(`GitHub`);
      channel.sendToQueue(`GitHub`, Buffer.from(JSON.stringify(rabbitData)));
      setTimeout(() => {
        connection.close();
      }, 500);
    };
    rabbit();
    return repository;
  }
}

export default CreateRepositoryService;
