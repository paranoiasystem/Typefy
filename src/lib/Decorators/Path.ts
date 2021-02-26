export class PathContainer {
  public static _providers: {[key: string]: any} = {};
}

export default function Path(path: string): Function {
  return function (target: {new (): any}): void {
    PathContainer._providers[target.name] = path;
  };
}
