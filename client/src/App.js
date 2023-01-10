import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Database from './pages/Database';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/database' element={<Database/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
