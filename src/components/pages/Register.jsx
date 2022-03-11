import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './pages.css'

export default function Register() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("")

    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('')

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')

    async function registerAction(){
        try{
            let payload = await axios.post('http://localhost:3001/api/users/create-user',
            {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword
            })

            console.log(payload)
            navigate('/')

        }catch(e){
            for( let key in e.response.data.error){
                if(key === "firstName"){
                    setFirstNameError(true)
                    setFirstNameErrorMessage(e.response.data.error[key])
                }
                if(key === "lastName"){
                    setLastNameError(true)
                    setLastNameErrorMessage(e.response.data.error[key])
                }
                if(key === "username"){
                    setUsernameError(true)
                    setUsernameErrorMessage(e.response.data.error[key])
                }
                if(key === "email"){
                    setEmailError(true)
                    setEmailErrorMessage(e.response.data.error[key])
                }
                if(key === "password"){
                    setPasswordError(true)
                    setPasswordErrorMessage(e.response.data.error[key])
                    if(e.response.data.error[key]){
                        setConfirmPasswordError(true)
                        setConfirmPasswordErrorMessage(e.response.data.error[key])
                    }
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
                    <div className='text-area-width'>
                        <TextField 
                            error={firstNameError} 
                            label="First Name" 
                            variant="standard"  
                            style={{width : "35%"}} 
                            helperText={firstNameErrorMessage}
                            onChange={ e => {
                                setFirstName(e.target.value)
                                setFirstNameError(false)
                                setFirstNameErrorMessage("")
                            }}
                        />
                        <TextField 
                            error={lastNameError}
                            label="Last Name" 
                            variant="standard"  
                            style={{width : "35%"}}
                            helperText={lastNameErrorMessage || " "}
                            onChange={ e => {
                                setLastName(e.target.value)
                                setLastNameError(false)
                                setLastNameErrorMessage('')
                            }}
                        />
                    </div>
                    <div  className='text-area-width'>
                        <TextField 
                            error={usernameError}
                            label="Username" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={usernameErrorMessage || " "}
                            onChange={ e => {
                                setUsername(e.target.value)
                                setUsernameError(false)
                                setUsernameErrorMessage('')
                            }}
                        />
                    </div>
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
                            error={passwordError}
                            type="password" 
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
                    <div  className='text-area-width'>
                        <TextField 
                            error={confirmPasswordError}
                            type="password" 
                            label="Confirm password" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={confirmPasswordErrorMessage || " "}
                            onChange={ e => {
                                setConfirmPassword(e.target.value)
                                setConfirmPasswordError(false)
                                setConfirmPasswordErrorMessage('')
                            }}
                        />
                    </div>
                    <div  className='text-area-width button'>
                        <Button onClick={() => registerAction()} variant="contained">Sign Up</Button>
                    </div>
                    
                    
                </Box>
            </div>

        <button onClick={() => {
            setFirstNameError(!firstNameError)
            setLastNameError(!lastNameError)
        }}>Error Tester</button>
            
        </>
    );
}