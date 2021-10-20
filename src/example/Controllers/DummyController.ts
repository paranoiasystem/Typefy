import {Path, GET, Inject, Request, Response, Server} from '../../lib/';
import DummyService from '../Services/DummyService';

@Path('/dummy')
class DummyController {
  @Inject('dummyService') static dummyService: DummyService;

  @GET('/method')
  dummyHandlerMethod(request: Request, response: Response) {
    const {someSupport} = Server.fastify;
    console.log('from plugin:', someSupport());
    response.send({message: DummyController.dummyService.dummyMethod()});
  }

  @GET('/property')
  dummyHandlerProperty(request: Request, response: Response) {
    response.send({message: DummyController.dummyService.dummyProterty});
  }
}

export default DummyController;
