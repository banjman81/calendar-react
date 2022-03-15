import React from 'react'
import jwtDecode from 'jwt-decode'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({children}) {
    const location = useLocation()
    let jwtToken = localStorage.getItem("loginToken")
    if(jwtToken){
        const token = `${process.env.REACT_APP_JWT_USER_SECRET} /// ${jwtToken}`
        const decodedToken = jwtDecode(token)
        if(decodedToken.exp < Date.now()/1000){
            return <Navigate to="/signin" state={{from: location}} />
        }else{
            return children
        }
    }else{
        return <Navigate to="/signin" state={{from: location}} />
    }
    
    
}

export default PrivateRoute