import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [image, setImage] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    const newEmployee = {
      name: name, 
      email: email,
      phone: phone,
      date: date, 
      country: country, 
      position: position, 
      salary: salary,
      image: image
    };
    if (!checkDuplicateEmployees(newEmployee)) {
      Axios.post("http://localhost:3001/create", newEmployee).then(() => { // Sending new employee to the backend
        setEmployeeList([...employeeList, newEmployee])
        console.log("successfully added " + name);
      }); 
    }else {
      console.log(newEmployee.name + " is already in the employee list")
    }
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployee = (id, update_selection, newVal) => {
    Axios.put("http://localhost:3001/update", {update_selection: update_selection, newVal: newVal, id: id}).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id == id ? updateEmployeeDictionary(update_selection, newVal, val) : val;
      }));
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete("http://localhost:3001/delete/" + id).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id;
      }))
    });
  };

  const updateEmployeeDictionary = (selection, newValue, originalDict) => {
    originalDict[selection] = newValue;
    console.log(originalDict);
    return originalDict;
  };

  const checkDuplicateEmployees = (potentialDup) => {
    const nameOfDup = potentialDup.name;
    for (const element of employeeList) {
      if (element.name == nameOfDup) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="App">
      <div className='information'>
        <div className='category'>
          <label>Name:</label>
          <input 
            type="text" 
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        
        <div className='category'>
          <label>Email:</label>
          <input 
            type="email" 
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Phone Number:</label>
          <input 
            type="tel" 
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Date Joined:</label>
          <input 
            type="date"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Country:</label>
          <input 
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Position:</label>
          <input 
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Salary:</label>
          <input 
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />
        </div>

        <div className='category'>
          <label>Profile Picture:</label>
          <input 
            type="file"
            onChange={(event) => {
              setImage(event.target.value);
            }}
          />
        </div>
        
        <div className='category'>
          <button onClick={addEmployee} className="add-employee">Add Employee</button>
        </div>
      </div>
      <hr/>
      <div className='employees'>
        <h1>List of Employees</h1>
        <div className='columns'>
          <h3>Picture</h3>
          <h3>ID</h3>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Phone Number</h3>
          <h3>Date</h3>
          <h3>Country</h3>
          <h3>Position</h3>
          <h3>Salary</h3>
        </div>
        {getEmployees()}
        {employeeList.map((val, key) => {
          return (
            <div key={key} className='employee'> 
              <div className='values'>
                <input 
                  type="text" 
                  className='value'
                  value={val.image}
                  readOnly
                />
                <input 
                  type="text" 
                  className='value'
                  value={val.id}
                  readOnly
                />
                <input 
                  type="text" 
                  className='value'
                  value={val.name}
                  onChange={(event) => {
                    updateEmployee(val.id, 'name', event.target.value);
                  }}/>
                <input 
                  type="email" 
                  className='value'
                  value={val.email}
                  onChange={(event) => {
                    updateEmployee(val.id, 'email', event.target.value);
                  }}/>
                <input 
                  type="tel" 
                  className='value'
                  value={val.phone}
                  onChange={(event) => {
                    updateEmployee(val.id, 'phone', event.target.value);
                  }}/>
                <input 
                  type="text"
                  className='value'
                  value={val.date}
                  onChange={(event) => {
                    updateEmployee(val.id, 'date', event.target.value);
                  }}/>
                <input 
                  type="text" 
                  className='value'
                  value={val.country}
                  onChange={(event) => {
                    updateEmployee(val.id, 'country', event.target.value);
                  }}/>
                <input 
                  type="text" 
                  className='value'
                  value={val.position}
                  onChange={(event) => {
                    updateEmployee(val.id, 'position', event.target.value);
                  }}/>
                <input 
                  type="text" 
                  className='value'
                  value={val.salary}
                  onChange={(event) => {
                    updateEmployee(val.id, 'salary', event.target.value);
                  }}
                  />
                <button className='delete' onClick={() => {deleteEmployee(val.id)}}>X</button>
              </div>
              {/* <div className='settings'>
                <div className='update_settings'>
                  <input 
                    type="text"
                    placeholder='...'
                    onChange={(event) => {
                      setUpdatedVal(event.target.value);
                    }}
                  />
                  <select id="update-selection">  
                    <option value="name">Name</option> 
                    <option value="email">Email</option>
                    <option value="phone">Phone Number</option>   
                    <option value="date">Date</option>  
                    <option value="country">Country</option>  
                    <option value="position">Position</option>
                    <option value="salary">Salary</option>
                    <option value="image">Profile Picture</option>
                  </select>
                </div>
                <button onClick={() => {updateEmployee(val.id, document.getElementById("update-selection").value)}}> Update </button>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
