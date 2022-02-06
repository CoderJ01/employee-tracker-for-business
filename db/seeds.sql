INSERT INTO department
    (id, name)
VALUES
    ('1', 'Engineering')


INSERT INTO position
    (id, title, salary, department_id)
VALUES
    ('2', 'Software Engineer', '80000', department_id)


INSERT INTO employee
    (id, first_name, last_name, position_id, manager_id)
VALUES
    ('Leonardo', 'Da Vinci', position_id, '10')


