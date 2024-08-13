import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../services/API";
import { Box, Container, CssBaseline, Link, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { clearCookies } from "../services/Utility";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { keyword, category } = location.state;

        postData("/item/searchItem", {
            keyword: `%${keyword}%`,
            categoryName: `%${category}%`
        }).then(({ status, data }) => {
            if (status === 200) {
                setSearchData(data);
            } else {
                setError("Failed to load search results.");
            }
            setLoading(false);
        }).catch(() => {
            setError("An error occurred while fetching the data.");
            setLoading(false);
        });
    }, [location.state]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!searchData || searchData.length === 0) {
        return <div>No items found.</div>;
    }

    const handleLogout = () => {
        clearCookies();
        navigate('/');
    };

    function handleItemClick(itemId) {
        navigate(`/ItemDetails?id=${itemId}`, { state: location.state });
    }

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
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h3" sx={{ mb: 3, fontSize: '3rem' }}>
                        Search Results
                    </Typography>
                    <Grid container spacing={4}>
                        {searchData.map((row) => (
                            <Grid item xs={12} sm={6} md={4} key={row.itemID}>
                                <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: '12px', backgroundColor: 'rgba(150, 96, 64, 0.61)' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ marginTop: 1.5, marginLeft: 2, marginBottom: 1.5, width: 120, height: 120, borderRadius: '12px', objectFit: 'cover' }}
                                        image={row.imageUrl} // Use the URL from the backend
                                        alt={row.itemName}
                                    />
                                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 22 }}>
                                            {row.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx ={{fontSize: 20, fontWeight: 'bold'}}>
                                            Price: ${row.price}
                                        </Typography>
                                        <Box sx={{ mt: 'auto' }}>
                                            <Link
                                                onClick={() => handleItemClick(row.itemID)}
                                                component="button"
                                                sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'rgba(5, 81, 216, 0.84)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                            >
                                                View Details
                                            </Link>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Link href="/SearchItems" style={{ fontSize: 20, fontWeight: 'bold' }}>&lt; Search</Link>
                </Box>
            </Container>
        </div>
    );
};

export default SearchResults;
