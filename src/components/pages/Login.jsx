import React, {useContext, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

import './pages.css'
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    useEffect(() => {
                if(user){
                    navigate('/')
                }
    })

    async function handleLogin(){

        
        

        try{
            let payload = await axios.post(`http://localhost:3001/api/users/login`,
            {
                email,
                password
            })

            const userData = await axios.get(`http://localhost:3001/api/users/getUserByEmail/${email}`)
            setUser(userData.data)
            window.localStorage.setItem("loginToken", payload.data.token)
            navigate('/')

        }catch(e){
            console.log(e)
            for( let key in e.response.data.error){
                if(key === "email"){
                    setEmailError(true)
                    setEmailErrorMessage(e.response.data.error[key])
                }
                if(key === "password"){
                    setPasswordError(true)
                    setPasswordErrorMessage(e.response.data.error[key])
                }
            }
        }
    }


    return (
        <>
            <Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    
                </Typography>
            </Box>
            <div className='form-container'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    className='text-input-area'
                    >
                    <div  className='text-area-width'>
                        <TextField 
                            error={emailError}
                            label="Email" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={emailErrorMessage || " "}
                            onChange={ e => {
                                setEmail(e.target.value)
                                setEmailError(false)
                                setEmailErrorMessage('')
                            }}
                        />
                    </div>
                    <div  className='text-area-width'>
                        <TextField 
                            type="password" 
                            error={passwordError}
                            label="Password" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={passwordErrorMessage || " "}
                            onChange={ e => {
                                setPassword(e.target.value)
                                setPasswordError(false)
                                setPasswordErrorMessage('')
                            }}
                        />
                    </div>
                    <div  className='text-area-width button'>
                        <Button onClick={() => handleLogin()} variant="contained">Sign In</Button>
                    </div>
                </Box>
            </div>
            
        </>
    );
}