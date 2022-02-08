const express = require('express');
const router = express.Router();
const db = require('../../localhost/connection');
const inputCheck = require('../../utils/inputCheck');

var employee = {};

employee.view = function () {
    // view all employees
    router.get('/employees', (req, res) => {
        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });
}

employee.create = function () {
    // create an employee
    router.post('/employee', ({ body }, res) => {
        const errors = inputCheck(
            body,
            'first_name',
            'last_name'
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
        const params = [
            body.first_name,
            body.last_name,
            body.role_id
        ];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    });
}

module.exports = employee;
