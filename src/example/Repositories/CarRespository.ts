import {Injectable} from '../../lib';
import Car from '../Models/Car';

@Injectable('carRepository')
class CarRespository {
  public cars: Array<Car> = [];

  constructor() {
    this.cars = [new Car('tesla', 'X', 300)];
  }

  public getCars(): Array<Car> {
    return this.cars;
  }

  public addCar(car: Car): void {
    this.cars.push(car);
  }

  public getCarsByBrand(brand: string): Array<Car> {
    return this.cars.filter(car => car.brand === brand);
  }
}

export default CarRespository;
