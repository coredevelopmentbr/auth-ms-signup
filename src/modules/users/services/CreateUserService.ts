import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/database/schemas/User';
import UserDTO from '../dtos/UserDTO';
import UsersInterface from '../interfaces/UsersInterface';
import HashProvider from '../providers/HashProvider/interfaces/HashProvider';
import SnsProvider from '../providers/SnsProvider/interfaces/SnsProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersInterface,

    @inject('HashProvider')
    private hashProvider: HashProvider,

    @inject('SnsProvider')
    private AmazonSnsProvider: SnsProvider
  ) {}

  public async execute(userData: UserDTO): Promise<User> {
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

    const snsPayload = {
      email,
      username,
      password: hashedPassword,
    };

    const parsedSnsPayload = JSON.stringify(snsPayload);

    this.AmazonSnsProvider.sendMessage(parsedSnsPayload);

    const user = await this.usersRepository.create(createUserData);

    return user;
  }
}

export default CreateUserService;
