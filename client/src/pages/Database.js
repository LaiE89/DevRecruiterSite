import '../App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';

function Database() {

  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    Axios.get("http://localhost:3001/accounts").then((response) => {
      setAccountList(response.data);
    });
  };

  return (
    <div className="App">
      <div className='toolbar'>
        <a className='profile' href='/profilesettings' >Profile</a>
      </div>
      <div className='database'>
        <h1>List of Developers</h1>
        <div className='columns'>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Phone Number</h3>
        </div>
        {accountList.map((val, key) => {
          return (
            <div key={key} className='accounts'> 
              <div className='values'>
                <h3>{val.name}</h3>
                <h3>{val.email}</h3>
                <h3>{val.phone}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Database;
