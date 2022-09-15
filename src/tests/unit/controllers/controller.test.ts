import CarModel from '../../../models/CarModel';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock } from '../../mocks/carMock';
const { expect } = chai;

describe('Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
	const carController = new CarController(carService);
	// Nosso req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
  const req = {} as Request;
  // Mesma coisa com o segundo parâmetro
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMock);

		res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('cadastrando um novo carro', () => {
    it('quando cadastrado com sucesso', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

});