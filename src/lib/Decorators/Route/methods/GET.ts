import {baseHTTPMethod} from '../';

export default function GET(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'GET', path);
  };
}
