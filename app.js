const mysql = require("mysql");
const inquirer = require("inquirer");

// connecting to sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  user: "root",

  password: "sqlroot123",
  database: "employee_tracker_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select an option",
      choices: [
        "VIEW roles, employees or departments",
        "UPDATE employee roles",
        "ADD department, roles, or employees",
        "QUIT",
      ],
    })
    .then(function (answer) {
      // based on their answer, run the specified function
      if (answer.action === "ADD department, roles, or employees") {
        addAction();
      } else if (answer.action === "UPDATE employee roles") {
        updateEmployeeRole();
      } else if (answer.action === "VIEW roles, employees or departments") {
        viewAction();
      } else if (answer.action === "QUIT") {
        connection.end();
      }
    });
}

function addAction() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addSelection",
        message: "Select what field where you would like to make an addition",
        choices: ["EMPLOYEES", "ROLES", "DEPARTMENTS", "RETURN"],
      },
    ])
    .then(function (answer) {
      if (answer.addSelection === "EMPLOYEES") {
        addEmployees();
      } else if (answer.addSelection === "ROLES") {
        addRoles();
      } else if (answer.addSelection === "DEPARTMENTS") {
        addDeparments();
      } else if (answer.addSelection === "RETURN") {
        start();
      }
    });
}
// Used bamazon class activity as reference

// User input to add employee info.
function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter first name of new employee",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter last name of new employee",
      },
      {
        type: "input",
        name: "role",
        message:
          "Please enter role id of new employee. Return to view roles to see options.",
      },
    ])
    // Input being passed into table
    .then(function (answer) {
      const query = "INSERT into employee SET ?";
      connection.query(
        query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
        },
        function (err, data) {
          if (err) throw err;
          start();
        }
      );
    });
}

function viewAction() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewSelection",
        message: "Would you like to view employees, roles, or departments",
        choices: ["EMPLOYEES", "ROLES", "DEPARTMENTS", "RETURN"],
      },
    ])
    .then(function (answer) {
      if (answer.viewSelection === "EMPLOYEES") {
        viewEmployees();
      } else if (answer.viewSelection === "ROLES") {
        viewRoles();
      } else if (answer.viewSelection === "DEPARTMENTS") {
        viewDeparments();
      } else if (answer.viewSelection === "RETURN") {
        start();
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    viewAction();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    viewAction();
  });
}

function viewDeparments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    viewAction();
  });
}
