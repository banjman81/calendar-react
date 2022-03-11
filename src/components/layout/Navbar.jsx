import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './navbar.css'

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar className='nav-holder'>
                <Box>
                    <Link className='nav-link' to="/">
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                    </Link>
                </Box>

                <Box>
                    <Link className='nav-link' to="/signin">
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link className='nav-link' to="/signup">
                        <Button color="inherit">Register</Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    );
}