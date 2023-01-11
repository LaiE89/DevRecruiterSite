import '../App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';

function ProfileSettings() {
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [skills, setSkills] = useState("");
    const [resume, setResume] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [accountList, setAccountList] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setID(parsedUser.id);
            setName(parsedUser.name);
            setEmail(parsedUser.email);
            setPhone(parsedUser.phone);
            setCountry(parsedUser.country);
            setSkills(parsedUser.skills);
            setResume(parsedUser.resume);
            setUsername(parsedUser.username);
            setPassword(parsedUser.password);
        }
    }, []);
  
    const getAccounts = () => {
        Axios.get("http://localhost:3001/accounts").then((response) => {
            setAccountList(response.data);
        });
    };
  
    const updateAccount = (id, newDict) => {
        Axios.put("http://localhost:3001/update", {newDict: newDict, id: id}).then(() => {
            // setAccountList(accountList.map((val) => {
            //     return val.id == id ? newDict : val;
            // }));
            const loggedInUser = localStorage.getItem("user");
            console.log(JSON.parse(loggedInUser));
        });
    };
  
    const deleteAccount = (id) => {
        Axios.delete("http://localhost:3001/delete/" + id).then((response) => {
            setAccountList(accountList.filter((val) => {
                return val.id != id;
            }))
            localStorage.clear();
            window.location.replace("/");
        });
    };

    const logout = () => {
        localStorage.clear();
        window.location.replace("/");
    };
  
    return (
      <div className="App">
        <div className='toolbar'>
          <a className='back' href='/database'>Back</a>
        </div>
        <div className='settings'>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>

            <label>Phone:</label>
            <input type="tel" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>

            <label>Country:</label>
            <input type="text" value={country} onChange={(e) => {setCountry(e.target.value)}}></input>
            
            <label>Skills:</label>
            <input type="text" value={skills} onChange={(e) => {setSkills(e.target.value)}}></input>

            <label>Resume:</label>
            <input type="file" onChange={(e) => {
                setResume(e.target.value);
                console.log(e.target.value)}}></input>

            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

            <button onClick={() => {updateAccount(id, {name: name, email: email, phone: phone, country: country, skills: skills, resume: resume, username: username, password: password})}}>Change Profile</button>
            {/* <button onClick={() => {deleteAccount(id)}}>Delete Account</button> */}
            <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
  
  export default ProfileSettings;
  