import {baseHTTPMethod} from '../';

export default function HEAD(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'HEAD', path);
  };
}
