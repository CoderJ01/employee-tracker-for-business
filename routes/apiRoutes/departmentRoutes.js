const express = require('express');
const db = require('../../localhost/connection');
const router = express.Router();
const inputCheck = require('../../utils/inputCheck');

var department = {};

department.view = function () {
    // view all departments
    router.get('/departments', (req, res) => {
        const sql = `SELECT * FROM department`;

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

department.create = function () {
    // create a department
    router.post('/department', ({ body }, res) => {
        const errors = inputCheck(
            body,
            'name',
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `INSERT INTO candidates (name) VALUES (?)`;
        const params = [
            body.name,
            body.id
        ];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message});
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    });
}

module.exports = department;
