package com.ap.rest.CarServer.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ap.rest.CarServer.model.Car;

@Repository
public interface CarDao extends JpaRepository<Car,Integer>{

}
