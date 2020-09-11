import FakeIssuesRepository from '@modules/issues/repositories/fakes/FakeIssuesRepository';
import GetRepositoryIssuesService from '@modules/issues/services/GetRepositoryIssuesService';
import FakeRepository from '../repositories/fakes/FakeRepository';
import CreateRepositoryService from './CreateRepositoryService';

describe('GetRepositoryIssues', () => {
  it('Should be able to get the issue of the day to plote correcly informations', async () => {
    const fakeRepository = new FakeRepository();
    const createRepository = new CreateRepositoryService(fakeRepository);
    const fakeIssuesRepository = new FakeIssuesRepository();
    const getRepositoryIssues = new GetRepositoryIssuesService(
      fakeIssuesRepository,
    );

    const repository = await createRepository.execute('facebook/react');
    const data = {
      repoName: repository.fullName,
      issuesData: {
        issuesCount: repository.openIssuesCount,
        repositoryId: repository.id,
      },
    };
    const issues = await getRepositoryIssues.execute(data);
    if (issues === []) {
      issues.forEach(issue => {
        expect(issue).toHaveProperty('id');
        expect(issue.repositoryId).toBe(repository.id);
      });
    }
  });

  it('Should be able to return the repository data from database', async () => {
    const fakeRepository = new FakeRepository();
    const createRepository = new CreateRepositoryService(fakeRepository);
    const fakeIssuesRepository = new FakeIssuesRepository();
    const getRepositoryIssues = new GetRepositoryIssuesService(
      fakeIssuesRepository,
    );
    const repository = await createRepository.execute('facebook/react');
    const data = {
      repoName: repository.fullName,
      issuesData: {
        issuesCount: repository.openIssuesCount,
        repositoryId: repository.id,
      },
    };
    const issues1 = await getRepositoryIssues.execute(data);
    const issues2 = await getRepositoryIssues.execute(data);

    if (issues1 === [] && issues2 === []) {
      const value1 = issues1.forEach(issue => {
        return issue.id;
      });
      const value2 = issues1.forEach(issue => {
        return issue.id;
      });
      expect(value2).toBe(value1);
    }
  });
});
