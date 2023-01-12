const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());

// Database methods
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
    const id = req.body.id;
    const newDict = req.body.newDict;
    // console.log(newDict);

    db.query("UPDATE accounts SET name = ?, email = ?, phone = ?, country = ?, skills = ?, resume = ?, username = ?, password = ? WHERE id = ?", 
    [newDict.name, newDict.email, newDict.phone, newDict.country, newDict.skills, newDict.resume, newDict.username, newDict.password, id], (err, result) => {
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

    db.query("SELECT * FROM accounts WHERE username = ? AND password = SHA1(?)", [username, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }else {
            if (result.length > 0) {
                res.send(result);
            }else {
                res.send({message: "Wrong username or password"});
            }
        }
    });
});

app.get('/skills', (req, res) => {
    db.query("SELECT skillname FROM skills", (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

// Email methods
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'devrecruiter@outlook.com',
      pass: 'mysql123$'
    }
});

app.post('/send_code/:email', (req, res) => {
    const email = req.params.email;
    const randomCode = generateRandomCode();
    var mailOptions = {
        from: "devrecruiter@outlook.com",
        to: email,
        subject: 'Dev Recruiter Verification Code',
        text: 'Here is your code for Dev Spy: ' + randomCode,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("Error sending email: " + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send(randomCode);
});

const generateRandomCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const portNumber = 3001;

app.listen(portNumber, () => {
    console.log("Server is running on port " + portNumber);
});