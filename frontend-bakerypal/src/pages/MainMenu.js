import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {getCookie, storeCookie, clearCookies} from '../services/Utility';
import {Link} from '@mui/material';
import List from '@mui/material/List';
import {useEffect, useState} from 'react';
import {fetchData} from '../services/API';
import '../index.css';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

const MainMenu = () => {
    let navigate = useNavigate();

    const [currentUser, ] = useState(getCookie("username"));
    const [firstName, setFirstName ] = useState("");
    const [lastName, setLastName] = useState("");
    const [adminPos, setAdminPos] = useState("");

    useEffect(() => {
        fetchData(`/user/${currentUser}/mainMenu`).then((data) => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAdminPos(data.position);
        });
    }, [currentUser]);

    const isAdmin = adminPos !== null;
    storeCookie("isAdmin", isAdmin);

    if (!firstName || !lastName) {
        return <div></div>;
    }

    const handleLogout = () => {
        clearCookies();
        navigate('/');
    };


    return (
        <div className="App App-header">
            <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                >
                    Logout ?
                </Button>
            </Box>
            <Container component="main" maxWidth="sm"
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
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h2" sx = {{textShadow: '5px 5px 5px rgba(79, 74, 204, 0.42)',}}>
                        Main Menu
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ marginTop: 4, }}>
                        {`Hello, ${firstName} ${lastName}!`}
                    </Typography>
                    {isAdmin && <Typography component="h1" variant="h5">
                        {`Administrative Position: ${adminPos}`}
                    </Typography>}
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item xs={isAdmin? 6: 12}>
                            <Typography component="h1" variant="h6">
                                Select one:
                            </Typography>
                            <div style={{ textAlign: "center" }}>
                                <List>
                                    <li><Link href="/SearchItems" sx={{ fontSize: 22 }}>Search for Bakery Items</Link></li>
                                    <li><Link href="/AddReviews" sx={{ fontSize: 22 }}>Add Review</Link></li>
                                    <li><Link href="/ViewReviews" sx={{ fontSize: 22 }}>View Previous Reviews</Link></li>
                                </List>
                            </div>
                        </Grid>
                        {isAdmin && <Grid item xs={6}>
                            <Typography component="h1" variant="h6">
                                Management
                            </Typography>
                            <div style={{ textAlign: "center" }}>
                                <List>
                                    <li><Link href="/manage/addItem" sx={{ fontSize: 22 }}>Add New Item</Link></li>
                                    <li><Link href="/manage/removeItem" sx={{ fontSize: 22 }}>Remove Bakery Item</Link></li>
                                    <li><Link href="/manage/editItem" sx={{ fontSize: 22 }}>Edit Item</Link></li>
                                </List>
                            </div>
                        </Grid>}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default MainMenu;
