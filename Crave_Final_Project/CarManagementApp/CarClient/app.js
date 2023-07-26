function showOption(option) {
    var optionContainers = document.getElementsByClassName("options");
    for (var i = 0; i < optionContainers.length; i++) {
        optionContainers[i].style.display = "none";
    }

    var selectedOptionContainer = document.getElementById(option);
    selectedOptionContainer.style.display = "block";
}

function showCar() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var cars = JSON.parse(this.responseText);
                displayCars(cars);
            } else {
                alert("Error occurred while fetching cars.");
            }
        }
    };
    request.open("GET", "http://localhost:8086/api/cars", true);
    request.send();
}

function displayCars(cars) {
    var carTableBody = document.getElementById("carTableBody");
    carTableBody.innerHTML = "";

    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + car.id + "</td>" +
            "<td>" + car.model + "</td>" +
            "<td>" + car.color + "</td>" +
            "<td>" + car.price + "</td>";
        carTableBody.appendChild(row);
    }
}

function addCar() {
    var id = document.getElementById("carId").value;
    var model = document.getElementById("Model").value;
    var color = document.getElementById("Color").value;
    var price = document.getElementById("Price").value;
    var carData = {
        "id": id,
        "model": model,
        "color": color,
        "price": price
    };
    if (id.trim() === "" || model.trim() === "" || color.trim() === "" || price.trim() === "") {
        document.getElementById("showAddedCar").innerHTML = "Please fill all fields";
        document.getElementById("showAddedCar").style.color = "Red";
    } else if (isNaN(id) || parseInt(id) < 1) {
        document.getElementById("showAddedCar").innerHTML = "Invalid ID. Please enter a positive ID";
        document.getElementById("showAddedCar").style.color = "Red";
    } else if (isNaN(price) || parseFloat(price) < 0) {
        document.getElementById("showAddedCar").innerHTML = "Invalid Price. Please enter a positive price";
        document.getElementById("showAddedCar").style.color = "Red";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(model)) {
        document.getElementById("showAddedCar").innerHTML = "Invalid Model. Please enter a string for model";
        document.getElementById("showAddedCar").style.color = "Red";
    } else if (!/^[a-zA-Z\s]+$/.test(color)) {
        document.getElementById("showAddedCar").innerHTML = "Invalid Color. Please enter a string for color";
        document.getElementById("showAddedCar").style.color = "Red";
    } else {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    document.getElementById("showAddedCar").innerHTML = "Car with ID " + id + " has been added.";
                    document.getElementById("showAddedCar").style.color = "green";
                } else {
                    alert("Error occurred while adding the car.");
                }
            }
        };
        request.open("POST", "http://localhost:8086/api/cars", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(carData));
    }
    setTimeout(function () {
        document.getElementById("showAddedCar").innerHTML = "";
        document.getElementById("carId").value = "";
        document.getElementById("Model").value = "";
        document.getElementById("Color").value = "";
        document.getElementById("Price").value = "";
    }, 3000);
}

function updateCar() {
    var id = document.getElementById("updateId").value;
    var model = document.getElementById("updateModel").value;
    var color = document.getElementById("updateColor").value;
    var price = document.getElementById("updatePrice").value;
    var carData = {
        "id": id,
        "model": model,
        "color": color,
        "price": price
    };
    if (id.trim() === "" || model.trim() === "" || color.trim() === "" || price.trim() === "") {
        document.getElementById("showUpdatedCar").innerHTML = "Please fill all fields";
        document.getElementById("showUpdatedCar").style.color = "Red";
    } else if (isNaN(id) || parseInt(id) < 1) {
        document.getElementById("showUpdatedCar").innerHTML = "Invalid ID. Please enter a positive ID";
        document.getElementById("showUpdatedCar").style.color = "Red";
    } else if (isNaN(price) || parseFloat(price) < 0) {
        document.getElementById("showUpdatedCar").innerHTML = "Invalid Price. Please enter a positive price";
        document.getElementById("showUpdatedCar").style.color = "Red";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(model)) {
        document.getElementById("showUpdatedCar").innerHTML = "Invalid Model. Please enter a string for model";
        document.getElementById("showUpdatedCar").style.color = "Red";
    } else if (!/^[a-zA-Z\s]+$/.test(color)) {
        document.getElementById("showUpdatedCar").innerHTML = "Invalid Color. Please enter a string for color";
        document.getElementById("showUpdatedCar").style.color = "Red";
    } else {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById("showUpdatedCar").innerHTML = "Car with ID " + id + " has been updated.";
                    document.getElementById("showUpdatedCar").style.color = "green";
                } else if (this.status == 404) {
                    document.getElementById("showUpdatedCar").innerHTML = "Car with ID " + id + " not found.";
                    document.getElementById("showUpdatedCar").style.color = "Red";
                } else {
                    alert("Error occurred while updating the car.");
                }
            }
        };
        request.open("PUT", "http://localhost:8086/api/cars/" + id, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(carData));
    }
    setTimeout(function () {
        document.getElementById("showUpdatedCar").innerHTML = "";
        document.getElementById("updateId").value = "";
        document.getElementById("updateModel").value = "";
        document.getElementById("updateColor").value = "";
        document.getElementById("updatePrice").value = "";
    }, 3000);
}

function deleteCar() {
    var id = document.getElementById("deleteId").value;
    if (id.trim() === "") {
        document.getElementById("showDeletedCar").innerHTML = "Please fill ID";
        document.getElementById("showDeletedCar").style.color = "Red";
    } else if (id < 1) {
        document.getElementById("showDeletedCar").innerHTML = "Invalid ID: Please fill positive ID";
        document.getElementById("showDeletedCar").style.color = "Red";
    } else {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById("showDeletedCar").innerHTML = "Car with ID " + id + " has been deleted.";
                    document.getElementById("showDeletedCar").style.color = "Green";
                } else if (this.status == 404) {
                    document.getElementById("showDeletedCar").innerHTML = "Car with ID " + id + " not found.";
                    document.getElementById("showDeletedCar").style.color = "Red";
                } else {
                    alert("Error occurred while deleting the car.");
                }
            }
        }
        request.open("DELETE", "http://localhost:8086/api/cars/" + id, true);
        request.send();
    }
    setTimeout(function () {
        document.getElementById("showDeletedCar").innerHTML = "";
        document.getElementById("deleteId").value = "";
    }, 3000);
}