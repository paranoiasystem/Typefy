import * as Fastify from 'fastify';
import * as fs from 'fs';
import * as _ from 'lodash';
import {IRouterOptions, IServerOptions} from './Interfaces';
import {PathContainer, RouteContainer} from './Decorators';

class Server {
  // Singleton Pattern
  private static _instance: Server;

  protected static fastifyInstance: Fastify.FastifyInstance;

  private static port: string;
  private static host: string;
  private static controllersPaths: Array<string>;

  private static initialize(options?: IServerOptions): Server {
    Server.port = options?.port || '3000';
    Server.host = options?.host || 'localhost';
    Server.controllersPaths = options?.controllersPaths || [];

    Server.fastifyInstance = Fastify.fastify({
      logger: true,
    });

    return Server;
  }

  public static start(): void {
    Server.loadControllers();
    Server.recordRoutes();
    Server.fastifyInstance.listen(this.port!, this.host!);
  }

  private static loadControllers(): void {
    try {
      _.forEach(Server.controllersPaths, (controllersPath: string) => {
        _.forEach(fs.readdirSync(controllersPath), controller => {
          require(`${controllersPath}/${controller}`);
        });
      });
    } catch (e) {
      throw new Error('The controller folder seems not exist');
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
