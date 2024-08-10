import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, MenuItem } from '@mui/material';
import '../index.css';
import { fetchData } from '../services/API';
import { useNavigate } from 'react-router-dom';
import {clearCookies} from "../services/Utility";

const Search = () => {
    let navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData("/categories").then((data) => {
            data.push({"categoryName": ""});
            setCategories(data);
        });
    }, []);

    const handleLogout = () => {
        clearCookies();
        navigate('/');
    };

    function onClickCancel() {
        navigate("/MainMenu");
    }


    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h3" variant="h2" sx={{ fontSize: '2.6rem', fontWeight: 'bold', textShadow: '5px 5px 5px rgba(79, 74, 204, 0.42)',}}>
                        Search Bakery Items
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="keyword"
                            label="Keyword"
                            name="keyword"
                            autoComplete="keyword"
                            autoFocus
                            onChange={(event) => {setKeyword(event.target.value)}}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            autoComplete="category"
                            select
                            onChange={(event) => {setCategory(event.target.value)}}
                            sx={{ textAlign: "left" }}
                        >
                            {
                                categories.map((category) => {
                                    const categoryName = category.categoryName;
                                    const categoryValue = (categoryName) ? categoryName : "None";
                                    return (<MenuItem value={categoryName}>{categoryValue}</MenuItem>);
                                })
                            }
                        </TextField>

                        <Grid container justify='space-between' sx={{ mt: 3, mb: 2 }}>
                            <Grid item xs={6}>
                                <Button type="button" variant='contained' sx={{ width: '90%' }} onClick={onClickCancel} >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Search;
