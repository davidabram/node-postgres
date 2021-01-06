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

