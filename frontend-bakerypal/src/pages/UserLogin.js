import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {storeCookie} from "../services/Utility";
import {fetchData} from '../services/API';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Grid} from '@mui/material';
import Button from '@mui/material/Button';
import '../index.css';

const Login = () => {
    let navigate = useNavigate();

    function onClickRegister() {
        navigate("/Register");
    }

    async function onClickLogin() {
        const UserData = await fetchData(`/user/validate/${username}/${password}`);
        if (UserData === 404) {
            window.alert("Invalid credentials. Please try again!");
        } else {
            storeCookie("username", username);
            navigate("/MainMenu");
        }
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className="App App-header">
            <Container component="main" maxWidth="xs"
                       sx={{
                           border: '3px solid #000',
                           borderRadius: '10px',
                           padding: '20px',
                           marginTop: 5,
                           backgroundColor: 'rgba(211, 203, 207, 0.1)',
                           backdropFilter: 'blur(10px)',
                           boxShadow: '15px 15px 15px rgba(201, 49, 128, 0.1)',
                       }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h1"
                                sx={{
                                    textShadow: '5px 5px 5px rgba(79, 74, 204, 0.42)', // Adjust the shadow to your preference
                                }}>
                        BakeryPal
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => {setUsername(event.target.value)}}
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
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                        <Grid container justify='space-between' sx={{ mt: 3, mb: 2 }}>
                            <Grid item xs={6}>
                                <Button type="button" variant='contained' sx={{ width: '90%' }} onClick={onClickLogin} disabled={!username || !password}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="button" variant='contained' sx={{ width: '90%' }} onClick={onClickRegister}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );

}

export default Login;