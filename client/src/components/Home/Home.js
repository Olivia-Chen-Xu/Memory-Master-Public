import React from 'react';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Paper>
            <Button component={Link} to={user?.result ? '/dashboard' : '/auth' } variant="contained" color="primary">Get Started</Button>
        </Paper>
        
    );
};

export default Home;