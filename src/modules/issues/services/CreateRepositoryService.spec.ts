import FakeRepository from '../repositories/fakes/FakeRepository';
import CreateRepositoryService from './CreateRepositoryService';

describe('CreateRepository', () => {
  it('Should be able to create a new Repository', async () => {
    const fakeRepository = new FakeRepository();
    const createRepository = new CreateRepositoryService(fakeRepository);

    const repository = await createRepository.execute('vuejs/vue');

    expect(repository).toHaveProperty('id');
    expect(repository).toHaveProperty('fullName');
    expect(repository.fullName).toBe('vuejs/vue');
  });
  it('Should not be able to create same Repository if then exists on database', async () => {
    const fakeRepository = new FakeRepository();
    const createRepository = new CreateRepositoryService(fakeRepository);

    const firstId = await createRepository.execute('vuejs/vue');
    const secondId = await createRepository.execute('vuejs/vue');
    expect(secondId.id).toBe(firstId.id);
  });
});
