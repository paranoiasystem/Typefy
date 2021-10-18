import * as Fastify from 'fastify';

export default interface IServerOptions extends Fastify.FastifyServerOptions {
  port?: string;
  host?: string;
  controllersPaths?: Array<string>;
}
