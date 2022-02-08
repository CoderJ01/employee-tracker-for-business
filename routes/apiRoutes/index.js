const express = require('express');
const router = express.Router();

const department = require('./departmentRoutes');
const role = require('./roleRoutes');
const employee = require('./employeeRoutes');

module.exports = { department, role, employee };