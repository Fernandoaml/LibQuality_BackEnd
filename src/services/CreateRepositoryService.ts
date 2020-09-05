import { getRepository } from 'typeorm';

import ICreateRepositoriesDTO from '../dtos/ICreateRepositoriesDTO';
import Repository from '../models/Repository';

class CreateRepositoryService {
  public async execute({ name }: ICreateRepositoriesDTO): Promise<Repository> {
    const projectRepository = getRepository(Repository);

    const checkRepositoryExists = await projectRepository.findOne({
      where: { name },
    });

    if (checkRepositoryExists) {
      throw new Error('This repository already existis on Database.');
    }

    const repository = projectRepository.create({
      name,
    });
    await projectRepository.save(repository);

    return repository;
  }
}

export default CreateRepositoryService;
