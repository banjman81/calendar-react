import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import './pages.css'

export default function Login() {
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
                        <TextField id="standard-basic" label="Email" variant="standard" style={{width : "72%"}}/>
                    </div>
                    <div  className='text-area-width'>
                        <TextField type="password" id="standard-basic" label="Password" variant="standard" style={{width : "72%"}}/>
                    </div>
                    <div  className='text-area-width button'>
                        <Button variant="contained">Sign In</Button>
                    </div>
                    
                    
                </Box>
            </div>
            
        </>
    );
}