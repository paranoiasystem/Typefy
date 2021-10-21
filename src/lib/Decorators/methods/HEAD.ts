import RouteContainer from '../RouteContainer';

export default function HEAD(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.baseHTTPMethod(
      target,
      propertyKey,
      descriptor,
      'HEAD',
      path
    );
  };
}
