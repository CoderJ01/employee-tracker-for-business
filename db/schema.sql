DROP TABLE IF EXISTS department
DROP TABLE IF EXISTS position
DROP TABLE IF EXISTS employee

CREATE TABLE department (
    id INT PRIMARY KEY
    department_name VARCHAR(30)
);

CREATE TABLE position (
    id INT PRIMARY KEY,
    title VARCHAR(30)
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT
);