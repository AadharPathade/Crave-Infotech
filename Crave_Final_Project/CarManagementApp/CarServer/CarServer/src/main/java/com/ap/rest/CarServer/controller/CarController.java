package com.ap.rest.CarServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ap.rest.CarServer.model.Car;
import com.ap.rest.CarServer.service.CarService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class CarController {
	@Autowired
	CarService carService;

	@GetMapping("/cars")
	public List<Car> getAllCars(){
		return carService.getAllCars();
	}
	
//	@GetMapping("/cars/{id}")
//	public Car getCarById(@PathVariable int id) {
//		return carService.getCarById(id);
//	}
	
	@PostMapping("/cars")
	public ResponseEntity<Car> createCar(@RequestBody Car car) {
		Car createdCar =  carService.createCar(car);
		return new ResponseEntity<>(createdCar, HttpStatus.CREATED);
	}
	
	@PutMapping("/cars/{id}")
	public ResponseEntity<String> updateCar(@PathVariable int id, @RequestBody Car updatedCar) {
		Car updatedCarResult = carService.updateCar(id, updatedCar);
        if (updatedCarResult != null) {
            return new ResponseEntity<>("Car with ID " + id + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Car with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
	}
	
	@DeleteMapping("/cars/{id}")
	public ResponseEntity<String> deleteCar(@PathVariable int id) {
		boolean isDeleted = carService.deleteCar(id);
        if (isDeleted) {
            return new ResponseEntity<>("Car with ID " + id + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Car with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
	}
}
