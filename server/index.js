const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employee_system',
});

// Insert stuff into the database with routes
app.post('/create', (req, res) => { // Get something from front end, use req. Send something to the front end, use res.
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;
    const image = req.body.image;

    db.query('INSERT INTO employees (name, email, phone, date, country, position, salary, image) VALUES (?,?,?,?,?,?,?,?)', // ? is a secure way to represent variables
    [name, email, phone, date, country, position, salary, image], (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send("Values inserted");
        }
    });
});

app.put('/update', (req, res) => {
    console.log("Update Selection: " + req.body.update_selection);
    const id = req.body.id;
    const update_selection = req.body.update_selection;
    const newVal = req.body.newVal;
    db.query("UPDATE employees SET ?? = ? WHERE id = ?", [update_selection, newVal, id], (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    }); 
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; // get id variable from /delete/:id
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

const portNumber = 3001;

app.listen(portNumber, () => {
    console.log("Server is running on port " + portNumber);
});