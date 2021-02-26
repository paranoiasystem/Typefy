import * as _ from 'lodash';

class Container {
  public static _providers: {[key: string]: any} = {};

  public static resolve(token: string) {
    const matchedProvider = _.find(
      Container._providers,
      (_provider, key) => key === token
    );

    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }
}

export function Injectable(token: string): Function {
  return function (target: {new (): any}): void {
    Container._providers[token] = new target();
  };
}

export function Inject(token: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => Container.resolve(token),
      enumerable: true,
      configurable: true,
    });
  };
}
