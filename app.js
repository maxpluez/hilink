var express = require('express');
var path = require('path');
var axios = require('axios');
var cookieSession = require('cookie-session')

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

function CreateAccount(name, password) {
  console.log("Inserting '" + name + "' into Table...");

  request = new Request(
      'INSERT INTO Users.Accounts (Name, Password) OUTPUT INSERTED.Id VALUES (@Name, @Password);',
      function(err, rowCount, rows) {
      if (err) {
          console.log(err);
      } else {
          console.log(rowCount + ' row(s) inserted');
      }
      });
  request.addParameter('Name', TYPES.NVarChar, name);
  request.addParameter('Password', TYPES.NVarChar, password);

  // Execute SQL statement
  connection.execSql(request);
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

app.use(express.static("public"));
app.use(express.json());
app.use(cookieSession({keys:["hilink"], maxAge:10*60*1000}));

app.post('/register.html', function(req, res, next) {
  var b = req.body;
  var accname;
  var pwd;
  try{
    for(jsonobj of b){
      if(jsonobj.name=='phone'){
        accname=jsonobj.value;
      }
      if(jsonobj.name=='password'){
        pwd=jsonobj.value;
      }
    }
    CreateAccount(accname, pwd);
  }
  catch(e){}
  finally{}
  res.redirect('/login.html');
});

app.post('/login.html', async function(req, res, next){
  console.log("Checking password...")
  var b = req.body;
  var accname;
  var pwd;
  var result;
  var flag = false;
  try{
    for(jsonobj of b){
     if(jsonobj.name=='phone'){
        accname=jsonobj.value;
      }
      if(jsonobj.name=='password'){
        pwd=jsonobj.value;
      }
    }
    flag = true;
    let p = new Promise(function(resolve, reject){
      resolve(CheckPassword(accname, pwd));
    });
    result = await p;
    console.log("result: " + result);
  }
  catch(e){}
  finally{}
  if(flag && result){
    flag = false;
    console.log("Redirecting to Home...")
    res.redirect('/');
} else {
    flag = false;
    console.log("Redirecting to ReLogin...")
    res.redirect('/login.html');
  }
});

app.listen(8080);
