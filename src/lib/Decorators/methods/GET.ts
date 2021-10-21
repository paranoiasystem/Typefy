import RouteContainer from '../RouteContainer';

export default function GET(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.baseHTTPMethod(target, propertyKey, descriptor, 'GET', path);
  };
}
