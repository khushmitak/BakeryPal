import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, CssBaseline, Typography, Grid, Card, CardContent, CardMedia, Button, Alert } from "@mui/material";
import { fetchData, postData } from "../services/API";
import {clearCookies} from "../services/Utility";

const EditItem = () => {
    const { itemID } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await fetchData("/item/viewAllItems");
                setItems(data);
            } catch (error) {
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    async function onClickEdit(itemData) {
        const newDetails = prompt(
            `Update details (separated by commas):\n\nCurrent Price: ${itemData.price}\nCurrent Image URL: ${itemData.imageUrl}\n\nFormat: New Price, New Image URL`,
            `${itemData.price}, ${itemData.imageUrl}`
        );

        if (newDetails && Object.keys(itemData).length !== 0) {
            const [newPrice, newImageUrl] = newDetails.split(',').map(item => item.trim());

            if (newPrice && newImageUrl) {
                try {
                    await postData(`/item/${itemData.itemID}/editItemDetails`, {
                        price: newPrice,
                        imageUrl: newImageUrl
                    }, "PUT");
                    alert("Item updated successfully");
                    window.location.reload();
                } catch (error) {
                    alert("Failed to update item.");
                }
            } else {
                alert("Please provide both the new price and the new image URL.");
            }
        }
    }


    const handleLogout = () => {
        clearCookies();
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h3" sx={{ mb: 3, fontSize: '3rem' }}>
                        Bakery Items
                    </Typography>
                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}
                    <Grid container spacing={4}>
                        {items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.itemID}>
                                <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: '12px', backgroundColor: 'rgba(150, 96, 64, 0.61)' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ marginTop: 1.5, marginLeft: 2, marginBottom: 1.5, width: 120, height: 120, borderRadius: '12px', objectFit: 'cover' }}
                                        image={item.imageUrl}
                                        alt={item.itemName}
                                    />
                                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                            Price: ${item.price}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onClickEdit(item)}
                                            >
                                                Edit
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
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

export default EditItem;
