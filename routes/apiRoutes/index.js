const express = require('express');
const router = express.Router();

const department = require('./departmentRoutes');
const role = require('./roleRoutes');
const employee = require('./employeeRoutes');

router.use(department);
router.use(role);
router.use(employee);

module.exports = { department, role, employee };