import { v4 } from 'uuid';

import UserTokensInterface from '@modules/users/interfaces/UsersInterface';
import UserDTO from '@modules/users/dtos/UserDTO';

import User from '../../infra/database/schemas/User';

class FakeUsersRepository implements UserTokensInterface {
  private users: User[] = [];

  public async create(userData: UserDTO): Promise<User> {
    const user = new User();

    const { name, email, cpf, username, password } = userData;

    Object.assign(user, {
      id: v4(),
      name,
      email,
      cpf,
      username,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  public async findById(user_id: unknown): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.username === username);

    return findUser;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cpf === cpf);

    return findUser;
  }
}

export default FakeUsersRepository;
