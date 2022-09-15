import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId: ICar & { _id: string } = {
	_id: '4edd40c86762e0fb12000003',
	model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockForChange: ICar = {
	model: 'Range Rover Sport',
  year: 2022,
  color: 'red',
  buyValue: 62000000,
  seatsQty: 2,
  doorsQty: 4
};

const carMockForChangeWithId: ICar & { _id: string } = {
	_id: '4edd40c86762e0fb12000003',
	model: 'Range Rover Sport',
  year: 2022,
  color: 'red',
  buyValue: 62000000,
  seatsQty: 2,
  doorsQty: 4
};

const carMockInvalid: any = {
	model: 'Range Rover Sport',
  year: 2022,
}


export { carMock,
        carMockWithId,
        carMockForChange,
        carMockForChangeWithId,
        carMockInvalid, 
      };
