export default class Car {
  private _brand: string;

  public get brand(): string {
    return this._brand;
  }

  public set brand(value: string) {
    this._brand = value;
  }

  private _model: string;

  public get model(): string {
    return this._model;
  }

  public set model(value: string) {
    this._model = value;
  }

  private _maxSpeed: number;

  public get maxSpeed(): number {
    return this._maxSpeed;
  }

  public set maxSpeed(value: number) {
    this._maxSpeed = value;
  }

  constructor(brand: string, model: string, maxSpeed: number) {
    this._brand = brand;
    this._model = model;
    this._maxSpeed = maxSpeed;
  }
}
