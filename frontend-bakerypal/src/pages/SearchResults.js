import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../services/API";
import { Box, Container, CssBaseline, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { formatDate } from "../services/Utility";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        let { keyword, category} = location.state;

        postData("/item/searchItem", {
            keyword: `%${keyword}%`,
            categoryName: `%${category}%`
        }).then((data) => {
            setSearchData(data[1]);
        }).catch((error) => {
            console.error("Error fetching search results:", error);
        });
    }, [location.state]);

    if (!searchData) {
        return <div></div>;
    }

    const columnOrder = ["ItemID", "ItemName", "CategoryName", "Price", "Description"];

    function formatHeader(header) {
        const headerMap = {
            "ItemID": "ID",
            "ItemName": "Item Name",
            "CategoryName": "Category",
            "Price": "Price",
            "Description": "Description"
        }
        return headerMap[header];
    }

    function onClickLink(itemId) {
        navigate(`/itemForSale?id=${itemId}`, {
            state: location.state
        });
    }

    return (
        <div className="App App-header">
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
                    <Typography component="h1" variant="h3">
                        Search Results
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginTop: 5, marginBottom: 5 }}>
                        {searchData && Object.keys(searchData).length !== 0 && <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        columnOrder.map((header) => {
                                            return (<TableCell key={header} align="left" style={{ fontWeight: "bold" }}>{formatHeader(header)}</TableCell>);
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    searchData.map((row) => {
                                        return (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                {
                                                    columnOrder.map((key) => {
                                                        let value = row[key];
                                                        if (key === "ItemName") {
                                                            const itemId = row["ItemID"];
                                                            value = (<Link onClick={() => onClickLink(itemId)} component="button">{value}</Link>);
                                                        }
                                                        return <TableCell align="left">{value}</TableCell>
                                                    })
                                                }
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>}
                    </TableContainer>
                    <Link href="/SearchForItems" style={{ fontSize: 14 }}>&lt; Search</Link>
                </Box>
            </Container>
        </div>
    );

}

export default SearchResults;
