import {hookRegister} from '../Route/index';

export default function Hook(hookName: string, handler: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    //console.log(target, propertyKey, descriptor, hookName, handler);
    hookRegister(target, propertyKey, descriptor, hookName, handler);
  };
}
