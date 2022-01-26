import { container } from 'tsyringe';

import HashProvider from './HashProvider/interfaces/HashProvider';
import SnsProvider from './SnsProvider/interfaces/SnsProvider';

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import AmazonSnsProvider from './SnsProvider/implementations/AmazonSnsProvider';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<SnsProvider>('SnsProvider', AmazonSnsProvider);
