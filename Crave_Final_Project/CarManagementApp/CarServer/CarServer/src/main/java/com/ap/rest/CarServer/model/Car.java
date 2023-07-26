package com.ap.rest.CarServer.model;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
public class Car {
	@Id
	private int Id;
	private String model,color;
	private float price;
	public Car() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Car(int id, String model, String color, float price) {
		super();
		Id = id;
		this.model = model;
		this.color = color;
		this.price = price;
	}
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	@Override
	public int hashCode() {
		return Objects.hash(Id, color, model, price);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Car other = (Car) obj;
		return Id == other.Id && Objects.equals(color, other.color) && Objects.equals(model, other.model)
				&& Float.floatToIntBits(price) == Float.floatToIntBits(other.price);
	}
	@Override
	public String toString() {
		return "Car [Id=" + Id + ", model=" + model + ", color=" + color + ", price=" + price + "]";
	}
	
}
