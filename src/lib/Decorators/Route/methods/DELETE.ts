import {baseHTTPMethod} from '../';

export default function DELETE(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    baseHTTPMethod(target, propertyKey, descriptor, 'DELETE', path);
  };
}
