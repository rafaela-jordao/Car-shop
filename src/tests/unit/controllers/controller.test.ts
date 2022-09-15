import CarModel from '../../../models/CarModel';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import { carMock, carMockWithId, carMockForChangeWithId, carMockForChange } from '../../mocks/carMock';
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
    sinon.stub(carService, 'read').resolves([carMock]);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(carMockForChangeWithId);

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

  describe('listando todos os carros', () => {
    it('quando listado com sucesso', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });

  describe('buscando carro pelo Id', () => {
    it('quando encontrado com sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('atualizando carro', () => {
    it('quando atualizado com sucesso', async () => {
      req.params = { id: carMockForChangeWithId._id };
      req.body = carMockForChange;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChangeWithId)).to.be.true;
    });
  });

});