import * as Fastify from 'fastify';
import {GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE} from './methods';

class RouteContainer {
  public static _providers: {[key: string]: any} = {};
}

function hookRegister(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  hookKey: string,
  handler: Function
) {
  if (!RouteContainer._providers[propertyKey]) {
    RouteContainer._providers[propertyKey] = {};
  }
  RouteContainer._providers[propertyKey][hookKey] = handler;
}

function baseHTTPMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  method: Fastify.HTTPMethods,
  path: string
): void {
  RouteContainer._providers[propertyKey] = {
    ...RouteContainer._providers[propertyKey],
    method: method,
    url: path,
    handler: descriptor.value,
    controllerName: target.constructor.name,
  };
}

export {
  GET,
  POST,
  PUT,
  PATCH,
  HEAD,
  OPTIONS,
  DELETE,
  baseHTTPMethod,
  hookRegister,
  RouteContainer,
};
