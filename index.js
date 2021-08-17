const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

const allRoles = []
const allManagers = []

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)

);
// Initial prompt
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
                "Add Department",
                "Exit"
            ]
        }
    ]).then(function (data)
    // switch statement depending on the choice in init prompt
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
            case "Exit":
                exit()
        }
    })
}
function exit()
{
    console.log("Thanks for using the Employee Tracker. Goodbye!")
    process.exit();
}

// Query to show all departments
function viewDepartments()
{
    db.query('SELECT * FROM department',function (err,results)
    {
        console.table(results);
        initPrompt()
    });
}
// Query to show all roles
function viewRoles()
{
    db.query('SELECT * FROM role',function (err,results)
    {
        console.table(results);
        initPrompt()
    });
}
// Query to show all employees
function viewEmployees()
{
    db.query('SELECT * FROM employee',function (err,results)
    {
        console.table(results);
        initPrompt()
    });
}
// If add employee is selected, this function runs
function addEmployee()
{
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "New Employee First Name: "

        },
        {
            name: "last_name",
            type: "input",
            message: "New Employee Last Name: "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their manager?",
            choices: selectManager()
        }
    ])
        // then add employee to database
        .then(function (data)
        {
            var roleId = selectRole().indexOf(data.role) + 1
            var managerId = selectManager().indexOf(data.manager) + 1

            db.query('INSERT INTO employee SET ?',
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    manager_id: managerId,
                    role_id: roleId
                },
                function (err,res)
                {
                    if (err) throw err;
                    console.table(res)
                    console.table(data)
                    initPrompt()
                },

            )
        })
}
// Make array of all roles
function selectRole()
{
    db.query('SELECT title FROM role',function (err,res)
    {
        for (var i = 0; i < res.length; i++) {
            allRoles.push(res[i].title)
        }
    })
    return allRoles;
}
// Making array of all managers
function selectManager()
{
    db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL',function (err,res)
    {
        for (var i = 0; i < res.length; i++) {
            allManagers.push(res[i].first_name)
        }
    })
    return allManagers;
}
// Prompt for the new department name and then insert into the database
function addDepartment()
{
    {
        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "Enter the new department name: "
            }
        ])
            .then(function (data)
            {

                db.query('INSERT INTO department SET ?',
                    {
                        name: data.department,
                    },function (err)
                {
                    console.table(data)
                    initPrompt()
                })
            })
    }
}
// Prompt for the new role and then insert into the database
// ! FIXXXXXXX
function addRole()
{
    db.query('SELECT role.title AS selectedTitle, role.salary AS selectedSalary FROM role', function (err,res)
    {
        inquirer.prompt([
            {
                name: "selectedTitle",
                type: "input",
                message: "Enter the role you'd like to add: "
            },
            {
                name: "selectedSalary",
                type: "input",
                message: "What is the salary of this role?"
            }
        ]).then(function (data)
        {
            console.log("data", data)
            db.query("INSERT INTO role SET ?",
                {
                    title: data.selectedTitle,
                    salary: data.selectedSalary,
                },
                function (err)
                {
                    console.table(data)
                    initPrompt()
                }
            )
        })
    })
}
// Select all employees and create a new array by their last name
function updateEmployee()
{
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id;',function (err,res)
    {
        inquirer.prompt([
            {
                type: "list",
                name: "updateId",
                message: "Select an employee to update: ",
                choices: function ()
                {
                    var allEmployees = []
                    for (var i = 0; i < res.length; i++) {
                        allEmployees.push(res[i].last_name)
                    }
                    return allEmployees
                },
            },
            // select the new employee's role
            {
                name: "role",
                type: 'list',
                message: "What is the Employee's new role?",
                choices: selectRole()
            },
            // update database with new employee
        ]).then(function (data)
        {
            var roleId = selectRole().indexOf(data.role) + 1
            db.query('UPDATE employee SET WHERE ?',
                {
                    id: data.updateId,
                    role_id: data.roleId
                },function (err) 
            {
                console.table(data)
                initPrompt()
            })
        })
    });
}

initPrompt()