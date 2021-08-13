const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
  
);

initPrompt()

function initPrompt()
{
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Update Employee",
        "Add Employee",
        "Add Role",
        "Add Department"
      ]
    }
  ]).then(function (data)
  {
    switch (data.choice) {
      case "View All Departments":
        viewDepartments()
        break;
      case "View All Roles":
        viewRoles()
        break;
      case "View All Employees":
        viewEmployees()
        break;
      case "Update Employee":
        updateEmployee()
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Add Role":
        addRole()
        break;
      case "Add Department":
        addDepartment()
        break;
    }
  })
}


function viewDepartments()
{
  db.query('SELECT * FROM department',function (err,results)
  {
    console.log(results);
  });
}