import '../App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';
import AsyncSelect from 'react-select/async';

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

    const [skillsList, setSkillsList] = useState([]);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            getSkills();
            const parsedUser = JSON.parse(loggedInUser);
            // console.log(parsedUser);
            setID(parsedUser.id);
            setName(parsedUser.name);
            setEmail(parsedUser.email);
            setPhone(parsedUser.phone);
            setCountry(parsedUser.country);
            setSkills(parsedUser.skills);
            setResume(parsedUser.resume);
            setUsername(parsedUser.username);
            setPassword(parsedUser.password);
        }else {
            alert("Account has been logged out");
            logout();
        }
    }, []);
  
    const getSkills = () => {
        Axios.get("http://localhost:3001/skills").then((response) => {
            let result = [];
            for (let key in response.data) {
                if(response.data.hasOwnProperty(key)) {
                    let value = response.data[key].skillname.replace("\r", "");
                    result.push({value: value, label: value, color: "black", id: parseInt(key) + 1});
                }
            }
            // console.log(result);
            setSkillsList(result);
        });
    };

    const getSkillsFromJson = () => {
        try {
            const curSkillIds = JSON.parse(skills);
            const result = []
            for (let i = 0; i < curSkillIds.length; i++) {
                const skill = skillsList.find(x => x.id === curSkillIds[i]);
                result.push(skill);
            }
            console.log(result);
            return result;   
        } catch (error) {
            // console.log(error);
        }
    }
  
    const updateAccount = (id, newDict) => {
        Axios.put("http://localhost:3001/update", {newDict: newDict, id: id}).then((response) => {
            // setAccountList(accountList.map((val) => {
            //     return val.id == id ? newDict : val;
            // }));
            newDict.id = id;
            localStorage.setItem('user', JSON.stringify(newDict));
        });
    };
  
    const deleteAccount = (id) => {
        Axios.delete("http://localhost:3001/delete/" + id).then((response) => {
            // setAccountList(accountList.filter((val) => {
            //     return val.id != id;
            // }))
            logout();
        });
    };

    const logout = () => {
        localStorage.clear();
        window.location.replace("/");
    };

// React-select methods
    const handleChange = (selectedOption) => {
        let result = [];
        selectedOption.forEach(function (arrayItem) {
            result.push(arrayItem.id);
        });
        console.log(JSON.stringify(result));
        setSkills(JSON.stringify(result));
    };

    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = skillsList.filter((option) => 
                option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            // console.log('Load options', searchValue, filteredOptions)
            callback(filteredOptions);
        }, 2000);
    };

    const colorStyles = {
        control: (styles) => ({
            ...styles,
        }),
        option: (styles, {data, isDisable, isFocused, isSelected}) => {
            return {...styles, color: data.color};
        },
        multiValue: (styles, {data}) => {
            return {
                ...styles,
                backgroundColor: "#fff",
                color: data.color
            }
        },
        placeholder: (styles) => {
            return {
                ...styles,
                color: '#fff',
            }
        },
        input: (styles) => ({
            ...styles,
            color: "#fff"
        })
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
            
            <div className="autocomplete">
                <AsyncSelect 
                    id='skills-select'
                    classNamePrefix="react-select"
                    loadOptions={loadOptions}
                    onChange={handleChange}
                    value={getSkillsFromJson()}
                    // value={[skillsList[1], skillsList[2], skillsList[3]]}
                    isMulti
                    styles={colorStyles}
                />
            </div>

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
  