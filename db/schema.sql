DROP DATABASE IF EXISTS fetchAPI;

CREATE DATABASE fetchAPI;

USE fetchAPI;


CREATE TABLE Balances (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  payer VARCHAR(40) NOT NULL,
  balance INT NOT NULL
);

CREATE TABLE Transactions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  payer VARCHAR(40),
  points INT,
  timestamp DATETIME,
  subBalance INT,
  trans_type VARCHAR(6),
  balanceId INT,
  FOREIGN KEY (balanceId) REFERENCES Balances(id)
);



