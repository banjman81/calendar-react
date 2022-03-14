import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import PrivateRoute from './components/privateRoute/PrivateRoute';

import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CreateEvent from './components/pages/protectedPages/CreateEvent';

import Navbar from './components/layout/Navbar';

export const UserContext = React.createContext({})

function App() {

  const [user, setUser] = useState(null)

  const tokenKey = process.env.REACT_APP_JWT_USER_SECRET

  useEffect(() => {
    try{
      let jwtToken = localStorage.getItem("loginToken")
      if(jwtToken){

        const token = `${process.env.REACT_APP_JWT_USER_SECRET} /// ${jwtToken}`
        const decodedToken = jwtDecode(token)
        if(decodedToken.exp < Date.now()/1000){
          setUser({})
        }else{
          async function getUser(){
            let payload = await axios.get(`http://localhost:3001/api/users/getUserByEmail/${decodedToken.email}`)
            setUser(payload.data)
          }
          getUser()
        }
          
      }
    }catch(e){
      localStorage.removeItem("loginToken")
      setUser({})
    }
    
    }, [])

  const providerValues= {
    user,
    setUser,
    tokenKey
  }
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={providerValues}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/create-event" element={<PrivateRoute><CreateEvent/></PrivateRoute>}>
          </Route>

        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
