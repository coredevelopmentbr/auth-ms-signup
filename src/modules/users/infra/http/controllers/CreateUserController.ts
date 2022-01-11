import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, username, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const userData = {
      name,
      email,
      cpf,
      username,
      password,
    };

    const user = await createUserService.execute(userData);

    return response.json(user);
  }
}

export default CreateUserController;
