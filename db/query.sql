-- SELECT role.title AS role,
--   department.name AS department
-- FROM role
--   JOIN department ON role.department_id = department.id;
SELECT department.name AS Department,
  role.title AS Role,
  role.salary AS Salary
FROM role
  JOIN department ON role.department_id = department.id;


