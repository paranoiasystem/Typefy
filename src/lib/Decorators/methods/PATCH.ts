import RouteContainer from '../RouteContainer';

export default function PATCH(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.baseHTTPMethod(
      target,
      propertyKey,
      descriptor,
      'PATCH',
      path
    );
  };
}
