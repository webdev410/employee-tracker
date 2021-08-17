INSERT INTO department (id, name)
VALUES (1, "Accounting"),
  (2, "Engineering"),
  (3, "HR"),
  (4, "IT"),
  (5, "Management");
INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Accountant", 80000.00, 1),
  (02, "Engineer", 180000.00, 2),
  (03, "Representitive", 45000.00, 3),
  (04, "Software Developer", 100000.00, 4),
  (05, "Manager", 65000.00, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Dave", "Manager", 05, NULL),
  (002, "Kevin", "Holmes", 05, NULL),
  (003, "Brandon", "Adams", 01, 001),
  (004, "Andrew", "Hart", 04, 002),
  (005, "Sara", "Foster", 03, 002);

DESCRIBE department;
DESCRIBE role;
DESCRIBE employee;

SELECT *
FROM department;
SELECT *
FROM employee;
SELECT *
FROM role;