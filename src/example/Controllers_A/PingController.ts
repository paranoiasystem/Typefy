import {Path, GET, Request, Response} from '../../lib/';

@Path('/ping')
class PingController {
  @GET('/')
  pingHandler(request: Request, response: Response) {
    response.send({message: 'pong'});
  }
}

export default PingController;
