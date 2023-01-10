import '../App.css';
import { useState } from "react";
import Axios from 'axios';

function Login() {
    return (
        <div className="App">
            <div className='login'>
                <h1>DEV SPY</h1>
                <h2>Login</h2>
                <input type="text" placeholder='Username'/>
                <input type="password" placeholder='Password'/>
                <a href="/register">Register</a>
            </div>
        </div>
    );
}

export default Login;