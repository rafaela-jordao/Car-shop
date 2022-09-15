
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../erros/catalog';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('Car model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('cadastrando um novo carro', () => {
		it('quando cadastrado com sucesso', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('listando todos os carros', () => {
		it('quando listado com sucesso', async () => {
			const listCar = await carModel.read();
			expect(listCar).to.be.deep.equal([carMockWithId]);
		});
	});

  describe('buscando carro pelo Id', () => {
		it('quando encontrado com sucesso', async () => {
			const carId = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carId).to.be.deep.equal(carMockWithId);
		});

		it('quando o Id não for encontrado', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});