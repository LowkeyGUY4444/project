import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from './Initializer';
import { Button, TextField, Container, Typography, Box, CssBaseline, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundVideo from './assets/background.mp4'; // Add a background video
import GoogleLogo from './assets/google-logo.png'; // Import Google logo

const theme = createTheme();

const Sign = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, auth } = useFirebase();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
      })
      .catch((error) => {
        // Handle errors
      });
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        // Handle errors
      });
  };

  if (user) {
    return <Navigate to="/chat" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: '600px', transition: 'transform 0.5s ease-in-out', transform: isRightPanelActive ? 'scale(1.05)' : 'scale(1)', backgroundColor: 'transparent', backdropFilter: 'blur(10px)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: isRightPanelActive ? 0 : 1,
                    pointerEvents: isRightPanelActive ? 'none' : 'auto',
                  }}
                >
                  <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    Sign In
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        style: { backgroundColor: 'transparent' },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: 'bold' },
                      }}
                      sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                          backgroundColor: 'transparent !important',
                        },
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        style: { backgroundColor: 'transparent' },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: 'bold' },
                      }}
                      sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                          backgroundColor: 'transparent !important',
                        },
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#303f9f',
                        },
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                      }}
                      onClick={signInWithEmail}
                    >
                      Sign In
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#388e3c',
                        },
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                      }}
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </Button>


                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: '',
                        backgroundColor: 'white',
                        color: 'black', // Change text color to black
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0 3px 5px 2px rgba(219, 68, 55, .3)',
                      }}
                      onClick={signInWithGoogle}
                    >
                      <img src={GoogleLogo} alt="Google logo" style={{ width: '20px', marginRight: '10px' }} />
                      Sign In/Up by Google
                    </Button>
                    
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: isRightPanelActive ? 1 : 0,
                    pointerEvents: isRightPanelActive ? 'auto' : 'none',
                  }}
                >
                  <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    Sign Up
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      InputProps={{
                        style: { backgroundColor: 'transparent' },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: 'bold' },
                      }}
                      sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                          backgroundColor: 'transparent !important',
                        },
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        style: { backgroundColor: 'transparent' },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: 'bold' },
                      }}
                      sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                          backgroundColor: 'transparent !important',
                        },
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        style: { backgroundColor: 'transparent' },
                      }}
                      InputLabelProps={{
                        style: { fontWeight: 'bold' },
                      }}
                      sx={{
                        '& .MuiAutocomplete-popupIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                          backgroundColor: 'transparent',
                        },
                        '& .MuiAutocomplete-inputRoot': {
                          backgroundColor: 'transparent !important',
                        },
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        backgroundColor: '#3f51b5',   
                        color: '#fff',        
                        '&:hover': {
                          backgroundColor: '#303f9f',     
                        },
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                      }}
                      onClick={signUpWithEmail}
                    >
                      Sign Up
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#388e3c',
                        },
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                      }}
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Sign;