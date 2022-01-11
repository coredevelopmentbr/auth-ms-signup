import { container } from 'tsyringe';

import HashProvider from './HashProvider/interfaces/HashProvider';

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
