import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../erros/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const result = CarZodSchema.safeParse(obj);
    if (!result.success) {
      throw result.error;
    }
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    const carId = await this._car.readOne(_id);
    if (!carId) throw new Error(ErrorTypes.EntityNotFound);
    return carId;
  }
}

export default CarService;

// referência safeParse: https://zod.dev/?id=safeparse