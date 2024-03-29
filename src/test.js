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

let user = ["Tom", 29];
let sql = "INSERT INTO users(name, age) VALUES(?, ?)";
 
connection.query(sql, user, (err, res) => {
    if(err) console.log(err);
    else console.log("Данные добавлены");
});

connection.end();