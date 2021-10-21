import RouteContainer from '../RouteContainer';

export default function OPTIONS(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.baseHTTPMethod(
      target,
      propertyKey,
      descriptor,
      'OPTIONS',
      path
    );
  };
}
