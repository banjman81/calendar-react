import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import PrivateRoute from './components/privateRoute/PrivateRoute';

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CreateEvent from './components/pages/protectedPages/CreateEvent';

import Navbar from './components/layout/Navbar';
import Profile from './components/pages/protectedPages/Profile';
import EventDetail from './components/pages/EventDetail';

export const UserContext = React.createContext({})

function App() {

  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])

  const tokenKey = process.env.REACT_APP_JWT_USER_SECRET
  async function checkUser(){
    try{
      let jwtToken = localStorage.getItem("loginToken")
      if(jwtToken){

        const token = `${process.env.REACT_APP_JWT_USER_SECRET} /// ${jwtToken}`
        const decodedToken = jwtDecode(token)
        if(decodedToken.exp < Date.now()/1000){
          setUser(null)
          window.localStorage.removeItem('loginToken')
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
      setUser(null)
    }
  }

  const dateFormat = (val) => {
    const newValue = new Date(val)
    let date=parseInt(newValue.getMonth()+1) +"/"+newValue.getDate() + "/" +newValue.getFullYear();
    return date
};

  useEffect(() => {
    checkUser()
    }, [])

  const providerValues= {
    user,
    setUser,
    tokenKey,
    checkUser,
    events,
    setEvents,
    dateFormat
  }
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={providerValues}>
        <Navbar />
          <ToastContainer
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
          />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/create-event" element={<PrivateRoute><CreateEvent/></PrivateRoute>}></Route>
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
          <Route path="/event/:id" element={<EventDetail />}/>
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
