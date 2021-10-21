import {Inject, Injectable} from '../../lib';
import Car from '../Models/Car';
import CarRespository from '../Repositories/CarRespository';

@Injectable('carService')
class CarService {
  @Inject('carRepository') static carRepository: CarRespository;

  constructor() {}

  public retriveCars(): Array<Car> {
    return CarService.carRepository.getCars();
  }
}

export default CarService;
