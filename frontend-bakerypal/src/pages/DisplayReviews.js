import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, CssBaseline, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { clearCookies } from "../services/Utility";
import { fetchData } from "../services/API";

const ViewReviews = () => {
    const navigate = useNavigate();
    const [reviewsData, setReviewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await fetchData("/item/viewReviews");
                setReviewsData(data);
            } catch (error) {
                setError("Failed to load reviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!reviewsData || reviewsData.length === 0) {
        return <div>No reviews found.</div>;
    }

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
                    Logout
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
                        Reviews
                    </Typography>
                    <Grid container direction="column" spacing={4}>
                        {reviewsData.map((review, index) => (
                            <Grid item xs={12} key={index}>
                                <Card sx={{ borderRadius: '12px', backgroundColor: 'rgba(150, 96, 64, 0.61)' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 22 }}>
                                            {review.reviews}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 19 }}>
                                            Date: {new Date(review.dateAndTime).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default ViewReviews;
