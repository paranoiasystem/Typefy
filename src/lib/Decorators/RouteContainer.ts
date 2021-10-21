import * as Fastify from 'fastify';

class RouteContainer {
  public static _providers: {[key: string]: any} = {};

  static hookRegister(
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

  static baseHTTPMethod(
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
}

export default RouteContainer;
