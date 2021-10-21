import RouteContainer from '../RouteContainer';

export default function DELETE(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.baseHTTPMethod(
      target,
      propertyKey,
      descriptor,
      'DELETE',
      path
    );
  };
}
