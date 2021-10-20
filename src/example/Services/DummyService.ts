import {Injectable, Server} from '../../lib';

@Injectable('dummyService')
class DummyService {
  public dummyProterty = 'dummyProperty';

  constructor() {}

  public dummyMethod(): string {
    const {someSupport} = Server.fastify;
    console.log('from plugin:', someSupport());
    return 'dummyMethod';
  }
}

export default DummyService;
