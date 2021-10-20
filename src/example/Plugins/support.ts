import fp from 'fastify-plugin';

export default fp(async fastify => {
  fastify.decorate('someSupport', () => {
    return 'hugs';
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
