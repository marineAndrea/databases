CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  ID int AUTO_INCREMENT PRIMARY KEY,
  userID int,
  messageBody varchar(142),
  room varchar(64),
  createdAt char(24) NOT NULL
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  ID int AUTO_INCREMENT PRIMARY KEY,
  name varchar(64)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

