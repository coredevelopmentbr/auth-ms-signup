import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/mocks/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeSnsProvider from '../providers/SnsProvider/fakes/FakeSnsProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeSnsProvider: FakeSnsProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeSnsProvider = new FakeSnsProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeSnsProvider
    );
  });

  it('should be able to create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '111.111.111-11',
      username: 'johndoe',
      password: '123456',
    };

    const createUser = await createUserService.execute(userData);

    expect(createUser).toHaveProperty('id');
  });

  it('should not be able to create an user with a existent email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '111.111.111-11',
      username: 'johndoe',
      password: '123456',
    };

    const existentEmail = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '111.111.111-12',
      username: 'johndoe2',
      password: '123456',
    };

    await createUserService.execute(userData);

    await expect(
      createUserService.execute(existentEmail)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with a existent cpf', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '111.111.111-11',
      username: 'johndoe',
      password: '123456',
    };

    const existentCPF = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      cpf: '111.111.111-11',
      username: 'johndoe2',
      password: '123456',
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(existentCPF)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to create an user with a existent username', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '111.111.111-11',
      username: 'johndoe',
      password: '123456',
    };

    const existentUsername = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      cpf: '111.111.111-12',
      username: 'johndoe',
      password: '123456',
    };

    await createUserService.execute(userData);

    await expect(
      createUserService.execute(existentUsername)
    ).rejects.toBeInstanceOf(AppError);
  });
});
