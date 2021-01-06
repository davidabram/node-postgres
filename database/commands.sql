CREATE TABLE drivers(id int primary key, first_name varchar(50), last_name varchar(50));
CREATE TABLE vehicles(id int primary key, make varchar(50), model varchar(50), year int, license_plate varchar(50));
CREATE TABLE ownerships(
  driver_id int,
  vehicle_id int,
  notes text,
  PRIMARY KEY(driver_id, vehicle_id),
  CONSTRAINT fk_driver FOREIGN KEY(driver_id) REFERENCES drivers(id),
  CONSTRAINT fk_vehicle FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
);

SELECT * FROM vehicles
JOIN ownerships ON vehicles.id = ownerships.vehicle_id
JOIN drivers ON drivers.id = ownerships.driver_id
WHERE drivers.id = 5

SELECT * FROM drivers
LEFT JOIN ownerships ON drivers.id = ownerships.driver_id
LEFT JOIN vehicles ON vehicles.id = ownerships.vehicle_id

SELECT DISTINCT drivers.id, drivers.last_name, drivers.first_name FROM drivers
JOIN ownerships ON drivers.id = ownerships.driver_id
JOIN vehicles ON vehicles.id = ownerships.vehicle_id
WHERE vehicles.make IN ('Toyota', 'Honda')