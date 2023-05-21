const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    console.log('Hello world')
    res.send('hello world!!!')
})

app.get('/info', (req, res) => {
connection.query(
    'SELECT * FROM user',
    function(err, results, fields){
        console.log(results)
        res.send(results)
    }
)
})

app.post('/users', function(request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
            //request.session.loggedin = true;
            //request.session.username = username;
          // Redirect to home page
          response.send(results);
        } else {
          response.send('Incorrect Username and/or Password!');
        }     
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });


app.listen(process.env.PORT || 3000)