var express = require('express');
var path = require('path');
var axios = require('axios');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')

var app = express();

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  server: 'localhost',
  authentication: {
      type: 'default',
      options: {
          userName: 'sa', // update me
          password: 'HiLink101' // update me
      }
  },
  options: {
      database: 'Users'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

app.use(express.static("public"));
app.use(express.json());
app.use(cookieSession({keys:["hilink"], maxAge:10*60*1000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/register.html', function(req, res, next) {
  var b = req.body;

  //insert b into table
  console.log("Inserting '" + b.accid + "' into Table...");

  request = new Request(
    'INSERT INTO Users.Accounts (FirstName, LastName, AccountName, Password, School, Grade, Email) OUTPUT INSERTED.Id VALUES (@FirstName, @LastName, @AccountName, @Password, @School, @Grade, @Email);',
    function(err, rowCount, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' row(s) inserted');
    }
  });

  //Format birthday into DATE type object
  var bdaystring = ""+b.bdayyear+"-"+b.bdaymonth+"-"+b.bdayday;

  request.addParameter('FirstName', TYPES.NVarChar, b.firstname);
  request.addParameter('LastName', TYPES.NVarChar, b.lastname);
  request.addParameter('AccountName', TYPES.NVarChar, b.accid);
  request.addParameter('Password', TYPES.NVarChar, b.pwd);
  request.addParameter('Birthday', TYPES.Date, bdaystring);
  request.addParameter('School', TYPES.NVarChar, b.school);
  request.addParameter('Grade', TYPES.TinyInt, b.grade);
  request.addParameter('Email', TYPES.NVarChar, b.email);

  // Execute SQL statement
  connection.execSql(request);
  
  res.redirect('/register.html');
});

app.post('/login.html', function(req, res, next){
  console.log("Checking password...")
  var b = req.body;

  console.log('Reading from the Table...');

  // Read all rows from table
  var reqstring = "SELECT Password FROM Users.Accounts WHERE AccountName='" + b.accid + "';"
  request = new Request(reqstring, function(err, rowCount, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' row(s) returned');
    }
  });

  // Retrieve password & Print the rows read
  var result = "";
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        result = column.value;
      }
    });
    if(result===b.pwd){
      console.log("Matched!");
      res.redirect('/');
    } else {
      console.log("Not matched!");
      res.redirect('/login.html')
    }
  });

  connection.execSql(request);
});

app.listen(8080);


//ignore everything below

/*
function CreateAccount(name, password) {
  console.log("Inserting '" + b.accid + "' into Table...");

  request = new Request(
    'INSERT INTO Users.Accounts (FirstName, LastName, AccountName, Password, Birthday, School, Grade, Email) OUTPUT INSERTED.Id VALUES (@FirstName, @LastName, @AccountName, @Password, @Birthday, @School, @Grade, @Email);',
    function(err, rowCount, rows) {
    if (err) {
      console.log("an error when inserting into db")
      console.log(err);
    } else {
      console.log(rowCount + ' row(s) inserted');
    }
  });
  console.log("request defined")

  //Format birthday into DATE type object
  var bdaystring = ""+ b.bdayyear + "-" + b.bdaymonth + "-" + b.bdayday;
  console.log("bdaystring: "+bdaystring)

  request.addParameter('FirstName', TYPES.NVarChar, b.firstname);
  request.addParameter('LastName', TYPES.NVarChar, b.lastname);
  request.addParameter('AccountName', TYPES.NVarChar, b.accid);
  request.addParameter('Password', TYPES.NVarChar, b.pwd);
  request.addParameter('Birthday', TYPES.DATE, bdaystring);
  request.addParameter('School', TYPES.NVarChar, b.school);
  request.addParameter('Grade', TYPES.TINYINT, b.grade);
  request.addParameter('Email', TYPES.NVarChar, b.email);
  console.log("request ready")

  // Execute SQL statement
  connection.execSql(request);
  console.log("request executed")
}

async function CheckPassword(name, password) {
  console.log('Reading from the Table...');

  // Read all rows from table
  var reqstring = "SELECT Password FROM Users.Accounts WHERE Name='" + name + "';"
  request = new Request(
  reqstring,
  function(err, rowCount, rows) {
  if (err) {
      console.log(err);
  } else {
      console.log(rowCount + ' row(s) returned');
  }
  });

  // Print the rows read
  var result = "";
  request.on('row', function(columns) {
      columns.forEach(function(column) {
          if (column.value === null) {
              console.log('NULL');
          } else {
              result = column.value;
          }
      });
      console.log(result);
      if(result===password){
        console.log("Matched!");
        return true;
      } else {
        console.log("Not matched!");
        return false;
      }
  });

  // Execute SQL statement
  connection.execSql(request);
}
*/