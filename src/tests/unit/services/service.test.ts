
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/Car';
import { ZodError } from 'zod';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('cadastrando um novo carro', () => {
		it('quando cadastrado com sucesso', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('quando houver erro', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});
});