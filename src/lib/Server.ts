import * as Fastify from 'fastify';
import * as fs from 'fs';
import * as _ from 'lodash';
import {IRouterOptions, IServerOptions} from './Interfaces';
import {PathContainer, RouteContainer} from './Decorators';

class Server {
  // Singleton Pattern
  private static _instance: Server;

  protected static fastifyInstance: Fastify.FastifyInstance;

  private static options: IServerOptions;

  private static initialize(options?: IServerOptions): Server {
    Server.options = options || {};

    Server.fastifyInstance = Fastify.fastify(options);

    return Server;
  }

  public static start(): void {
    Server.loadPlugins();
    Server.loadControllers();
    Server.recordRoutes();
    Server.fastifyInstance.listen(this.options.port!, this.options.host!);
  }

  private static loadControllers(): void {
    try {
      _.forEach(Server.options.controllersPaths, (controllersPath: string) => {
        _.forEach(fs.readdirSync(controllersPath), controller => {
          require(`${controllersPath}/${controller}`);
        });
      });
    } catch (e) {
      throw new Error('The controller folder seems not exist');
    }
  }

  private static loadPlugins(): void {
    try {
      _.forEach(fs.readdirSync(Server.options.pluginsPath || ''), plugin => {
        this.fastifyInstance.register(
          require(`${Server.options.pluginsPath}/${plugin}`)
        );
      });
    } catch (e) {
      throw new Error('The plugins folder seems not exist');
    }
  }

  private static generatePath = (path: string, basePath: string): string =>
    !basePath ? path : path !== '/' ? `${basePath}${path}` : basePath;

  private static recordRoutes(): void {
    _.forEach(RouteContainer._providers, (route: IRouterOptions) => {
      _.forEach(PathContainer._providers, (path, pathKey) => {
        if (route.controllerName === pathKey) {
          Server.fastifyInstance.route({
            method: route.method,
            config: undefined,
            handler: route.handler,
            onError: undefined,
            onRequest: undefined,
            onResponse: undefined,
            onSend: undefined,
            onTimeout: undefined,
            preHandler: undefined,
            preParsing: undefined,
            preSerialization: undefined,
            preValidation: undefined,
            url: Server.generatePath(route.url, path),
          });
        }
      });
    });
  }

  public static getInstance(options?: IServerOptions): Server {
    if (!Server._instance) {
      Server._instance = Server.initialize(options);
    }
    return Server._instance;
  }

  public static getFastifyInstance(): Fastify.FastifyInstance {
    if (!Server._instance) {
      throw new Error(
        'Before get fastify instance you need to create the server instance'
      );
    }
    return Server.fastifyInstance;
  }
}

export default Server;
