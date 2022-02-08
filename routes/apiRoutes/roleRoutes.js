const express = require('express');
const router = express.Router();
const db = require('../../localhost/connection');
const inputCheck = require('../../utils/inputCheck');

var role = {};

role.view = function () {
    // view all roles
    router.get('/roles', (req, res) => {
        const sql = `SELECT * FROM role`;

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

role.create = function () {
    // create a role
    router.post('/role', ({ body }, res) => {
        const errors = inputCheck(
            body,
            'title',
            'salary'
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `INSERT INTO role (title, salary) VALUES (?, ?)`;
        const params = [
            body.title,
            body.salary,
            body.department_id
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

module.exports = role;