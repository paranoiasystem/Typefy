import RouteContainer from './RouteContainer';

export default function Hook(hookName: string, handler: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    RouteContainer.hookRegister(
      target,
      propertyKey,
      descriptor,
      hookName,
      handler
    );
  };
}
