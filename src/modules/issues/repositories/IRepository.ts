import Repository from '@modules/issues/infra/typeorm/entities/Repository';
import ICreateInternalRepositoriesDTO from '@modules/issues/dtos/ICreateInternalRepositoriesDTO';

export default interface ICreateRepositories {
  findRepositoryByName(name: string): Promise<Repository | undefined>;
  create(data: ICreateInternalRepositoriesDTO): Promise<Repository>;
}
