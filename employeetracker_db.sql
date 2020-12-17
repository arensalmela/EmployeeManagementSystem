drop database if exists employee_tracker_db;
create database employee_tracker_db;
use employee_tracker_db;
create table department (
department_id int auto_increment not null primary key,
name varchar(30) not null);

create table role (
role_id int auto_increment not null primary key,
title varchar(30) not null,
salary decimal(10,2) not null,
department_id int not null);

create table employee (
employee_id int auto_increment not null primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int);


