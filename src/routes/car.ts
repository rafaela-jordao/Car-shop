import { Router } from 'express';
import CarModel from '../models/CarModel';
import CarService from '../services/Car';
import CarController from '../controllers/Car';

const route = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.put('/cars/:id', (req, res) => carController.update(req, res));

export default route;
