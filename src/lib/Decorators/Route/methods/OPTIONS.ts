import {baseHTTPMethod} from '../';

export default function OPTIONS(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'OPTIONS', path);
  };
}
