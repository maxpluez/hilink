var express = require('express');
var path = require('path');
//var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
var session = require('express-session')
var TediousStore = require('connect-tedious')(session);
//var cons = require('consolidate');

var app = express();

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
/*
var config = {
  server: 'hilinkdb01.database.windows.net',
  authentication: {
      type: 'default',
      options: {
          userName: 'admin-hilink', // update me
          password: 'W3lcome2HL' // update me
      }
  },
  options: {
      database: 'HiLinkDB01'
  }
}
*/

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
*/

app.use(express.json());
//app.use(cookieSession({keys:["hilink"], maxAge:10*60*1000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'hilink',
  store: new TediousStore({
    /*
    config: {
      userName: 'sa',
      password: 'HiLink101',
      server: 'localhost',
      options: {
        database: 'Users'
      }
    }
    */

    config: {
      userName: 'sa',
      password: 'HiLink101',
      server: 'localhost',
      options: {
        database: 'Users'
      }
    }

    , tableName: 'Users.Sessions'
  }),
  saveUninitialized: false,
  resave: false
}));

app.post('/register.html', function(req, res, next) {
  var b = req.body;

  //insert b into table
  console.log("Inserting '" + b.accid + "' into Table...");

  //Check if connected. If not, connect.
  //console.log("Current connection state: " + connection.state.name);
  //console.log("Desired state: " + connection.STATE.LOGGED_IN.name);
  if(connection.state !== connection.STATE.LOGGED_IN){
    console.log("Previously disconnected. Now reconnecting...");
    connection.close();
    connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected');
      }
    });
  }

  //proceed until connected
  while(connection.state !== connection.STATE.LOGGED_IN){}

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
  
  res.redirect('/login.html');
});

app.post('/login.html', function(req, res, next){
  console.log("Checking password...")
  var b = req.body;

  console.log('Reading from the Table...');

  //Check if connected. If not, connect.
  //console.log("Current connection state: " + connection.state.name);
  //console.log("Desired state: " + connection.STATE.LOGGED_IN.name);
  if(connection.state !== connection.STATE.LOGGED_IN){
    console.log("Previously disconnected. Now reconnecting...");
    connection.close();
    connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected');
      }
    });
  }

  //proceed until connected
  while(connection.state !== connection.STATE.LOGGED_IN){}

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
      req.session.key=b.accid;
      res.redirect('/userredirect');
      console.log("Session key: " + req.session.key);
    } else {
      res.redirect('/login.html')
    }
  });

  connection.execSql(request);
});

app.get('/userredirect', function(req, res, next){
  if(!req.session.key){
    res.redirect('login.html');
  } else {
    res.render('user', {m_id: req.session.key});
  }
});

app.get('/logout', function(req, res, next){
  req.session.destroy((err) => {
    if(err) {
        return console.log(err);
    }
    res.redirect('/');
  });
});

app.use(express.static("public"));

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