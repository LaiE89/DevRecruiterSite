const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
    const country = req.body.country;
    const skills = req.body.skills;
    const resume = req.body.resume;
    const username = req.body.username;
    const password = req.body.password;

    db.query('INSERT INTO accounts (name, email, phone, country, skills, resume, username, password) VALUES (?,?,?,?,?,?,?,SHA1(?))', // ? is a secure way to represent variables
    [name, email, phone, country, skills, resume, username, password], (err, result) => {
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
    db.query("UPDATE accounts SET ?? = ? WHERE id = ?", [update_selection, newVal, id], (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    }); 
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; // get id variable from /delete/:id
    db.query("DELETE FROM accounts WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/accounts', (req, res) => {
    db.query("SELECT * FROM accounts", (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ? AND password = SHA1(?)", [username, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }else {
            if (result) {
                res.send(result);
            }else {
                res.send({message: "Wrong username or password"});
            }
        }
    });
});

const portNumber = 3001;

app.listen(portNumber, () => {
    console.log("Server is running on port " + portNumber);
});