import * as Fastify from 'fastify';

export default interface IRouterOptions extends Fastify.RouteOptions {
  controllerName: string;
}
