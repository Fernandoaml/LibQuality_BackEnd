import { container } from 'tsyringe';

import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import IssuesRepository from '@modules/issues/infra/typeorm/repositories/IssuesRepository';

import IReporsitory from '@modules/issues/repositories/IRepository';
import RepositoryEntities from '@modules/issues/infra/typeorm/repositories/Repository';

container.registerSingleton<IIssuesRepository>(
  'IssuesRepository',
  IssuesRepository,
);
container.registerSingleton<IReporsitory>('Repository', RepositoryEntities);
