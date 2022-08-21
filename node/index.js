const express = require("express")
const app = express()
const port = 3000
const db_config = {
  host: "db",
  user: "root",
  password: "root",
  database: "node_db",
}
const mysql = require("mysql")

let connection = mysql.createConnection(db_config)
let sql = "CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name VARCHAR(255), primary key(id) );"
console.log("Tem tabela?")
connection.query(sql)
sql = "SELECT * FROM people;"
connection.query(sql, (err, result, fields) => {
  if (err) throw err;
  if(result.length == 0){
    sql = "INSERT INTO people(name) values('João')"
    connection.query(sql)
    sql = "INSERT INTO people(name) values('Maria')"
    connection.query(sql)
  }
  connection.end()
})


app.get("/", (req, res) => {
  let connection = mysql.createConnection(db_config)
  connection.query("SELECT * FROM people", (err, result, fields) => {
    if (err) throw err;
    let lines = result.map((p) => `<li>${p.name}</li>`).join("")
    connection.end()
    res.send(`<h1>Full cycle</h1><lu>${lines}</lu>`)
  })
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})

const poplue = () => {
  let sql = "SELECT * FROM information_schema.tables WHERE table_schema = 'node_db' AND table_name = 'people';"
  
}
