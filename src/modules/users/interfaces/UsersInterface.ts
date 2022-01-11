import User from '../infra/database/schemas/User';
import IUsersDTO from '../dtos/UserDTO';

export default interface UsersInterface {
  create(userData: IUsersDTO): Promise<User>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}
