import * as Fastify from 'fastify';

export default interface IRouterOption {
  method: Fastify.HTTPMethods;
  config: string | undefined;
  handler: Fastify.RouteHandlerMethod;
  onError: Function | undefined;
  onRequest: Function | undefined;
  onResponse: Function | undefined;
  onSend: Function | undefined;
  onTimeout: Function | undefined;
  preHandler: Function | undefined;
  preParsing: Function | undefined;
  preSerialization: Function | undefined;
  preValidation: Function | undefined;
  url: string;
}
