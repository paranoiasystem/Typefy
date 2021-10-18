import * as fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
