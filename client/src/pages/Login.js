import '../App.css';
import { useState } from "react";
import Axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [loginStatus, setLoginStatus] = useState('');

    const login = async e => {
        e.preventDefault();
        const loggingInUser = {username: username, password: password};
        Axios.post("http://localhost:3001/login", loggingInUser).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            }else {
                // setLoginStatus(response.data[0].username);
                if (localStorage.getItem('user')) {
                    const oldUser = localStorage.getItem('user');
                    alert("Already logged in as: " + JSON.parse(oldUser).username);
                    // localStorage.clear();
                }else {
                    localStorage.setItem('user', JSON.stringify(response.data[0]));
                }
                window.location.replace("/database");
            }
        });
    };

    return (
        <div className="App">
            <div className='login'>
                <h1>DEV SPY</h1>
                <h2>Login</h2>
                <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder='Username'/>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder='Password'/>
                <button onClick={login}>Login</button>
                <a href="/register">Register</a>
                <h2>{loginStatus}</h2>
            </div>
        </div>
    );
}

export default Login;