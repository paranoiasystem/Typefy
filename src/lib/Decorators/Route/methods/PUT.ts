import {baseHTTPMethod} from '../';

export default function PUT(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'PUT', path);
  };
}
