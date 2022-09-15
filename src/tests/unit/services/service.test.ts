
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/Car';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../erros/catalog';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock, carMockWithId, carMockForChangeWithId,
	carMockForChange, carMockInvalid } from '../../mocks/carMock';
const { expect } = chai;

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves([carMockWithId]);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
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

	describe('listando todos os carros', () => {
		it('quando listado com sucesso', async () => {
			const listCar = await carService.read();

			expect(listCar).to.be.deep.equal([carMockWithId]);
		});

		it('quando não for possível listar', async () => {
			try {
				await carService.read();
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('buscando carro pelo Id', () => {
		it('quando encontrado com sucesso', async () => {
			const carId = await carService.readOne(carMockWithId._id);

			expect(carId).to.be.deep.equal(carMockWithId);
		});

		it('quando o Id não for encontrado', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('atualizando carro', () => {
		it('quando atualizado com sucesso', async () => {
			const carUpdated = await carService.update('4edd40c86762e0fb12000003', carMockForChange);
			expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
		});

		it('quando body for inválido', async () => {
			try {
				await carService.update('4edd40c86762e0fb12000003', carMockInvalid);
				expect(true).to.be.false;
			} catch (error: any) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});
});