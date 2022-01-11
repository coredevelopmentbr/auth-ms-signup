import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/database/schemas/User';
import IUserDTO from '../dtos/UserDTO';
import IUsersInterface from '../interfaces/UsersInterface';
import IHashProvider from '../providers/HashProvider/interfaces/HashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(userData: IUserDTO): Promise<User> {
    const { name, email, cpf, username, password } = userData;

    const findUserByEmail = await this.usersRepository.findByEmail(email);
    const findUserByCpf = await this.usersRepository.findByCpf(cpf);
    const findUserByUsername = await this.usersRepository.findByUsername(
      username
    );

    if (findUserByEmail) {
      throw new AppError('Email, CPF or Username already exists', 400);
    }

    if (findUserByCpf) {
      throw new AppError('Email, CPF or Username already exists', 400);
    }

    if (findUserByUsername) {
      throw new AppError('Email, CPF or Username already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const createUserData = {
      name,
      email,
      cpf,
      username,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(createUserData);

    return user;
  }
}

export default CreateUserService;
