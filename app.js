const mysql = require("mysql");
const inquirer = require("inquirer");

// connecting to sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  user: "root",

  password: "",
  database: "",
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
      message:
        "Would you like to add department, roles, and employees. Would you like to update employee roles? Or would you like to view the employee data base?",
      choices: [
        "ADD department, roles, or employees",
        "UPDATE employee roles",
        "VIEW employee database",
      ],
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.action === "ADD department, roles, or employees") {
        addAction();
      } else if (answer.action === "UPDATE employee roles") {
        updateAction();
      } else if (answer.action === "VIEW employee database") {
        viewAction();
      } else {
        connection.end();
      }
    });
}
