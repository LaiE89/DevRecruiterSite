import '../App.css';
import { useState } from "react";
import Axios from 'axios';

function Register() {

    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [retypePasswordReg, setRetypePasswordReg] = useState('');

    const register = () => {

        const newAccount = { 
            name: "",
            email: emailReg,
            phone: "",
            country: "",
            skills: "",
            resume: "",
            username: usernameReg,
            password: passwordReg,
        };
        Axios.get("http://localhost:3001/accounts").then((response) => {
            return response.data;
        }).then((data) => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isDuplicate = checkDuplicateAccount(newAccount, data);
            const isPassMatch = newAccount.password == retypePasswordReg;
            const isEmailValid = emailRegex.test(newAccount.email);
            if (!isDuplicate && isPassMatch && isEmailValid) {
                Axios.post("http://localhost:3001/send_code/" + newAccount.email).then((response) => {
                    const randomCode = response.data;
                    console.log("This is the random code: " + randomCode);
                    let verificationCode = prompt('Please enter the verification code sent to ' + newAccount.email);
                    if (verificationCode == randomCode) {
                        Axios.post("http://localhost:3001/create", newAccount).then(() => { // Sending new account to the backend
                            console.log("successfully added " + newAccount.email);
                        }); 
                    }else {
                        console.log("Code is incorrect")
                    }
                });
            }else {
                if (isDuplicate) {
                    console.log(newAccount.email + " or " + newAccount.username + " is already taken");
                }else if (!isPassMatch) {
                    console.log("Passwords do not match");
                }else if (!isEmailValid) {
                    console.log("Email is not valid");
                }else {
                    console.log("Cannot create account");
                }
            }
        });
    }

    const checkDuplicateAccount = (potentialDup, accounts) => {
        const emailOfDup = potentialDup.email.toLowerCase();
        const usernameOfDup = potentialDup.username.toLowerCase();
        for (const element of accounts) {
            if (element.email.toLowerCase() == emailOfDup || element.username.toLowerCase() == usernameOfDup) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="App">
            <div className='login'>
                <h1>DEV SPY</h1>
                <h2>Register</h2>
                <input type="text" onChange={(e) => {setEmailReg(e.target.value)}} placeholder='Email'/>
                <input type="text" onChange={(e) => {setUsernameReg(e.target.value)}} placeholder='Username'/>
                <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}} placeholder='Password'/>
                <input type="password" onChange={(e) => {setRetypePasswordReg(e.target.value)}} placeholder='Retype Password'/>
                <button onClick={register}>Register</button>
                <a href="/">Go back to login</a>
            </div>
        </div>
    );
}

export default Register;