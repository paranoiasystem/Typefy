import {Path, GET, Inject, Request, Response} from '../../lib/';
import CarService from '../Services/CarService';

@Path('/car')
class CarController {
  @Inject('carService') static carService: CarService;

  @GET('/')
  getCars(request: Request, response: Response) {
    response.send(CarController.carService.retriveCars());
  }
}

export default CarController;
