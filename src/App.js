import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import Navbar from './components/layout/Navbar';

const UserContext = React.createContext({})


function App() {

  const [user, setUser] = useState(null)

  const providerValues= {
    user,
    setUser
  }
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{providerValues}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
