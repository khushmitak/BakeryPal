import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { fetchData } from "../services/API";
import { useLocation, useNavigate } from "react-router-dom";
import {clearCookies} from "../services/Utility";

const ItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const clickedItemId = new URLSearchParams(queryString).get("id");

        if (clickedItemId) {
            fetchData(`/item/${clickedItemId}`).then((data) => setItemData(data));
        }
    }, []);

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
                    Logout
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
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Item Details
                </Typography>
                {itemData.itemName ? (
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(211, 203, 207, 0.2)',
                        borderRadius: '12px',
                        boxShadow: 'none',
                    }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 240, height: 240, borderRadius: '12px', objectFit: 'cover', marginTop: 3 }}
                            image={itemData.imageUrl}
                            alt={itemData.itemName}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                {itemData.itemName}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.5rem' }}>
                                Price: ${itemData.price}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 , fontSize: '1.35rem'}}>
                                <strong>Description:</strong><br />
                                <Typography component="span" sx={{ fontSize: '1.25rem' }}>
                                    {itemData.description}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                        Loading...
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </Box>
        </Container>
        </div>
    );
};

export default ItemDetails;
