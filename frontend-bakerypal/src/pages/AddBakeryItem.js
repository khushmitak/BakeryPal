import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { postData, fetchData } from '../services/API';
import { clearCookies } from "../services/Utility";
import { Grid, MenuItem } from "@mui/material";

const AddItem = () => {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [isNewCategory, setIsNewCategory] = useState(false);

    useEffect(() => {
        fetchData("/categories").then((data) => {
            setCategories(data);
        });
    }, []);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (value === "new") {
            setIsNewCategory(true);
            setCategoryName('');
        } else {
            setIsNewCategory(false);
            setCategoryName(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status, data } = await postData('/item/addItem', { itemName, description, price, categoryName, imageUrl });

            if (status === 200) {
                alert('New item has been added.');
                navigate('/MainMenu');
            } else {
                alert(`Failed to add the item: ${typeof data === 'string' ? data : 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error occurred while adding the item:', error);
            alert('An error occurred while adding the item.');
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
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout ?
                </Button>
            </Box>
            <Container component="main" maxWidth="xs" sx={{
                border: '3px solid #000',
                borderRadius: '10px',
                padding: '20px',
                marginTop: 1,
                backgroundColor: 'rgba(211, 203, 207, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '15px 15px 15px rgba(201, 49, 128, 0.1)',
            }}>
                <CssBaseline />
                <Box sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h2" sx={{ textShadow: '5px 5px 5px rgba(79, 74, 204, 0.42)' }}>
                        New Item
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1, width: '100%', maxWidth: '600px' }} onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="itemName"
                            label="Item Name"
                            name="itemName"
                            autoComplete="itemName"
                            autoFocus
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="number"
                            autoComplete="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="categoryName"
                            label="Category"
                            name="categoryName"
                            select
                            value={categoryName}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryName} value={category.categoryName}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                            <MenuItem value="new">Add New Category</MenuItem>
                        </TextField>
                        {isNewCategory && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="newCategory"
                                label="New Category Name"
                                name="newCategory"
                                autoComplete="new-category"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="imageUrl"
                            label="Image URL"
                            name="imageUrl"
                            autoComplete="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <Grid container justify='space-between' sx={{ mt: 3, mb: 2 }}>
                            <Grid item xs={6}>
                                <Button type="submit" variant='contained' sx={{ width: '90%' }}>
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

export default AddItem;
