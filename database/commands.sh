psql -d sfdt -h localhost -U azurediamond -c "copy drivers from STDIN DELIMITER ',' CSV HEADER;" < $1
psql -d sfdt -h localhost -U azurediamond -c "copy vehicles from STDIN DELIMITER ',' CSV HEADER;" < $2
psql -d sfdt -h localhost -U azurediamond -c "copy ownerships from STDIN DELIMITER ',' CSV HEADER;" < $3
