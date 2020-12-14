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
  // run the starting function below
});
