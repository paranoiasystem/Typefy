import {config as configDotenv} from 'dotenv';
import {resolve} from 'path';

switch (process.env.NODE_ENV) {
  case 'dev':
    configDotenv({
      path: resolve(__dirname, '../../.env.dev'),
    });
    break;
  case 'prod':
    configDotenv({
      path: resolve(__dirname, '../../.env.prod'),
    });
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} not found!`);
}
