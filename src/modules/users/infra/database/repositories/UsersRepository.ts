import { getRepository, Repository } from 'typeorm';

import UsersInterface from '@modules/users/interfaces/UsersInterface';
import UserDTO from '@modules/users/dtos/UserDTO';

import User from '../schemas/User';

class UsersRepository implements UsersInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: UserDTO): Promise<User> {
    const { name, email, cpf, username, password } = userData;

    const userToken = this.ormRepository.create({
      name,
      email,
      cpf,
      username,
      password,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const userToken = await this.ormRepository.findOne({ id: user_id });

    return userToken;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userToken = await this.ormRepository.findOne({ email });

    return userToken;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const userToken = await this.ormRepository.findOne({ cpf });

    return userToken;
  }

  public async findByUsername(usename: string): Promise<User | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { usename },
    });

    return userToken;
  }
}

export default UsersRepository;
