import {baseHTTPMethod} from '../';

export default function PATCH(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'PATCH', path);
  };
}
