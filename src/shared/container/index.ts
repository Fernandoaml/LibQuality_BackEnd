import { container } from 'tsyringe';

import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import IssuesRepository from '@modules/issues/infra/typeorm/repositories/IssuesRepository';

// import IIssuesRepository from '@shared/modules/issues/';
// import IssuesRepository from '@shared/modules/issues/infra/typeorm/repositories/IssuesRepository';

container.registerSingleton<IIssuesRepository>(
  'IssuesRepository',
  IssuesRepository,
);
