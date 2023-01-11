import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Database from './pages/Database';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/database' element={<Database/>}/>
      <Route path='/profilesettings' element={<ProfileSettings/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
