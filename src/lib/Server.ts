import * as Fastify from 'fastify';
import AutoLoad from 'fastify-autoload';
import * as fs from 'fs';
import * as _ from 'lodash';
import {IRouterOptions, IServerOptions} from './Interfaces';
import {PathContainer, RouteContainer} from './Decorators';

class Server {
  // Singleton Pattern
  private static _instance: Server;

  private static _fastify: Fastify.FastifyInstance;

  private static options: IServerOptions;

  private static initialize(options?: IServerOptions): Server {
    this.options = options || {};

    this._fastify = Fastify.fastify(options);

    return this;
  }

  public static async start(): Promise<void> {
    await this.loadPlugins();
    await this.loadControllers();
    await this.recordRoutes();
    await this.fastify.ready(e => {
      if (e) throw e;
    });
    this.fastify.listen(this.options.port!, this.options.host!);
  }

  private static async loadControllers(): Promise<void> {
    try {
      _.forEach(Server.options.controllersPaths, (controllersPath: string) => {
        _.forEach(fs.readdirSync(controllersPath), controller => {
          require(`${controllersPath}/${controller}`);
        });
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  private static async loadPlugins(): Promise<void> {
    try {
      await this.fastify.register(AutoLoad, {
        dir: `${Server.options.pluginsPath}`,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  private static generatePath = (path: string, basePath: string): string =>
    !basePath ? path : path !== '/' ? `${basePath}${path}` : basePath;

  // TODO: migliorare i cicli for
  private static recordRoutes(): void {
    _.forEach(RouteContainer._providers, (route: IRouterOptions) => {
      _.forEach(PathContainer._providers, (path, pathKey) => {
        if (route.controllerName === pathKey) {
          this.fastify.register(async (fastify: Fastify.FastifyInstance) => {
            fastify.route({
              method: route.method,
              config: undefined,
              handler: route.handler,
              onError: route.onError,
              onRequest: route.onRequest,
              onResponse: route.onResponse,
              onSend: route.onSend,
              onTimeout: route.onTimeout,
              preHandler: route.preHandler,
              preParsing: route.preParsing,
              preSerialization: route.preSerialization,
              preValidation: route.preValidation,
              url: Server.generatePath(route.url, path),
            });
          });
        }
      });
    });
  }

  public static getInstance(options?: IServerOptions): Server {
    if (!this._instance) {
      this._instance = this.initialize(options);
    }
    return this._instance;
  }

  public static get fastify(): Fastify.FastifyInstance {
    if (!this._instance) {
      throw new Error(
        'Before get fastify instance you need to create the server instance'
      );
    }
    return this._fastify;
  }
}

export default Server;
