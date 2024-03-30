const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sodpk",
  password: ''
});

connection.query("SELECT * FROM contacts", (err, res) => {
    if (err) throw err;
    console.log(res);
});

connection.end();