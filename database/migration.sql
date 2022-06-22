DROP DATABASE IF EXISTS crankdatsteps;
DROP TABLE IF EXISTS dancesteps;

CREATE DATABASE crankdatsteps;

\c crankdatsteps

CREATE TABLE dancesteps(
   id SERIAL PRIMARY KEY,
   steps TEXT
);