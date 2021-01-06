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

SELECT DISTINCT drivers.id, drivers.last_name, drivers.first_name FROM drivers
WHERE drivers.id IN (
  SELECT DISTINCT drivers.id FROM drivers
  JOIN ownerships ON drivers.id = ownerships.driver_id
  JOIN vehicles ON vehicles.id = ownerships.vehicle_id
  WHERE vehicles.make = 'Toyota'
)
AND drivers.id IN (
  SELECT DISTINCT drivers.id FROM drivers
  JOIN ownerships ON drivers.id = ownerships.driver_id
  JOIN vehicles ON vehicles.id = ownerships.vehicle_id
  WHERE vehicles.make = 'Honda'
)


-- make Toyota model Camry

SELECT * from vehicles
WHERE vehicles.make = 'Toyota' AND vehicles.model = 'Camry'

EXPLAIN ANALYZE SELECT * from vehicles
WHERE vehicles.make = 'Toyota' AND vehicles.model = 'Camry'

-- Seq Scan on vehicles  (cost=0.00..24.00 rows=1 width=31) (actual time=0.006..0.093 rows=2 loops=1)
--   Filter: (((make)::text = 'Toyota'::text) AND ((model)::text = 'Camry'::text))
--   Rows Removed by Filter: 998
-- Planning time: 0.173 ms
-- Execution time: 0.100 ms

-- 0.273

CREATE INDEX idx_vehicles_make_model
ON vehicles(make, model);


-- Index Scan using idx_vehicles_make_model on vehicles  (cost=0.28..8.29 rows=1 width=31) (actual time=0.011..0.013 rows=2 loops=1)
--   Index Cond: (((make)::text = 'Toyota'::text) AND ((model)::text = 'Camry'::text))
-- Planning time: 0.223 ms
-- Execution time: 0.022 ms


CREATE INDEX idx_vehicles_make
ON vehicles(make);

-- Index Scan using idx_vehicles_make_model on vehicles  (cost=0.28..8.29 rows=1 width=31) (actual time=0.015..0.016 rows=2 loops=1)
--  Index Cond: (((make)::text = 'Toyota'::text) AND ((model)::text = 'Camry'::text))
-- Planning time: 0.254 ms
-- Execution time: 0.026 ms

CREATE INDEX idx_vehicles_make_Toyota_model_Camry
ON vehicles(make, model)
WHERE make = 'Toyota' AND model = 'Camry';

-- Index Scan using idx_vehicles_make_toyota_model_camry on vehicles  (cost=0.13..8.14 rows=1 width=31) (actual time=0.003..0.004 rows=2 loops=1)
-- Planning time: 0.242 ms
-- Execution time: 0.010 ms

CREATE INDEX idx_vehicles_make_Toyota
ON vehicles(make)
WHERE make = 'Toyota';