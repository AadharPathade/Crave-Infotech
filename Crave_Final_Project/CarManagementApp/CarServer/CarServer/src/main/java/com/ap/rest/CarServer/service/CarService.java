package com.ap.rest.CarServer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ap.rest.CarServer.Dao.CarDao;
import com.ap.rest.CarServer.model.Car;

@Service
public class CarService {
	@Autowired
	CarDao carDao;

	public List<Car> getAllCars() {
		// TODO Auto-generated method stub
		return carDao.findAll();
	}

//	public Car getCarById(int id) {
//		// TODO Auto-generated method stub
//		return carDao.findById(id).get();
//	}

	public Car createCar(Car car) {
		// TODO Auto-generated method stub
		return carDao.save(car);
	}

	public Car updateCar(int id, Car updatedCar) {
		// TODO Auto-generated method stub
		Optional<Car> optionalCar = carDao.findById(id);
		if(optionalCar.isPresent()) {
			Car existingCar = optionalCar.get();
			existingCar.setModel(updatedCar.getModel());
			existingCar.setColor(updatedCar.getColor());
			existingCar.setPrice(updatedCar.getPrice());
			return carDao.save(existingCar);
		}else {			
			return null;
		}
	}

	public boolean deleteCar(int id) {
		// TODO Auto-generated method stub
		if(carDao.existsById(id)) {
			carDao.deleteById(id);
			return true;
		}else {
			return false;
		}
	}
		
}
