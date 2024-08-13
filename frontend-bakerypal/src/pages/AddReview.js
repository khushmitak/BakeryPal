import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { postData } from '../services/API';
import {clearCookies} from "../services/Utility";
import {Grid} from "@mui/material";

const AddReview = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState('');

    const handleReviewChange = (event) => {
        setReviews(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status, data } = await postData('/item/addReview', { reviews });

            if (status === 200) {
                alert('Your review has been added.');
                navigate('/MainMenu');
            } else {
                alert(`Failed to add review: ${typeof data === 'string' ? data : 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error occurred while adding the review:', error);
            alert('An error occurred while adding the review.');
        }
    };

    const handleLogout = () => {
        clearCookies();
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/MainMenu');
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
            <Container component="main" maxWidth="xs"
                       sx={{
                           border: '3px solid #000',
                           borderRadius: '10px',
                           padding: '20px',
                           marginTop: 1,
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
                    <Typography component="h1" variant="h2"
                                sx={{
                                    textShadow: '5px 5px 5px rgba(79, 74, 204, 0.42)',
                                }}>
                        Add Review
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 , width: '100%', maxWidth: '600px'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="review"
                            label="Your Review"
                            name="review"
                            autoComplete="review"
                            autoFocus
                            multiline
                            rows={4}
                            value={reviews}
                            onChange={handleReviewChange}
                        />
                        <Grid container justify='space-between' sx={{ mt: 3, mb: 2 }}>
                            <Grid item xs={6}>
                                <Button type="button" variant='contained' sx={{ width: '90%' }} onSubmit={handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="button" variant='contained' sx={{ width: '90%' }} onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default AddReview;
