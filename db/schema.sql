DROP DATABASE fetchAPI IF EXISTS;

CREATE DATABASE fetchAPI;

USE DATABASE fetchAPI;

CREATE TABLE Transactions (
  id: INT AUTO_INCREMENT,
  payer: VARCHAR(40),
  points: INT,
  timestamp: DATE,
  subBalance: INT,
  trans_type: VARCHAR(6),
  FOREIGN KEY (balanceId) REFERENCES Balances(id)
);

CREATE TABLE Balances (
  id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  payer: VARCHAR(40),
  balance: INT,
);

