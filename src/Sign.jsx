import React from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFirebase } from './Initializer';


const SignIn = ({ signInWithGoogle }) => (
    
    <Box sx={{ textAlign: 'center', marginTop: 35  }}>
       
        <Typography sx={{ fontSize: '20px' }}>
            <h1>Welcome to   Chat App </h1>
        </Typography>
        <Typography>
            <h3 style={{fontFamily:'cursive'}}>a totally original chatting platform where you <br/> can group chat</h3>
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            sx={{ mb: 2 }}
        >
            Sign in with Google
        </Button>
    </Box>
    
);

const Sign = () => {
    const { user, auth } = useFirebase();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <>
        
            {user ? <Navigate to="/chat" /> : <SignIn signInWithGoogle={signInWithGoogle} />}

       </>
    );
};

export default Sign;
