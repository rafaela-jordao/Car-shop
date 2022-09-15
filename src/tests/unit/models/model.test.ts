
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('Car model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
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
});