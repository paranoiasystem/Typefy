import './config';
import * as path from 'path';
import {Server} from '../lib';

Server.getInstance({
  port: process.env.SERVER_PORT,
  controllersPaths: [
    `${path.dirname(__filename)}/Controllers`,
    `${path.dirname(__filename)}/Controllers_A`,
  ],
  pluginsPath: `${path.dirname(__filename)}/Plugins`,
  /*logger: {
    prettyPrint: {
      levelFirst: true,
    },
  },*/
  logger: true,
});

Server.start();
