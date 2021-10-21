import {Path, POST, GET, Request, Response, Hook} from '../../lib/';

@Path('/echo')
class EchoController {
  @POST('/')
  echoHandler(request: Request, response: Response) {
    response.send({echo: request.body});
  }

  @GET('/:id')
  @Hook('onRequest', async (request: Request, response: Response) => {
    console.log(request.headers);
  })
  async echoParameterHandler(request: Request, response: Response) {
    const params: any = request.params;
    response.send({id: params.id});
  }

  @GET('/:id/:id2')
  echoTwoParameterHandler(request: Request, response: Response) {
    const params: any = request.params;
    response.send({id: params.id, id2: params.id2});
  }
}

export default EchoController;
