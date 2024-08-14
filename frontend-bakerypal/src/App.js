import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/UserLogin';
import Register from './pages/UserRegistration';
import MainMenu from './pages/MainMenu';
import SearchForItems from "./pages/SearchForItems";
import SearchResults from "./pages/SearchResults";
import ItemDetails from "./pages/ItemDetails";
import AddReview from "./pages/AddReview";
import DisplayReviews from "./pages/DisplayReviews";
import AddItem from "./pages/AddBakeryItem";
import RemoveItem from "./pages/DeleteBakeryItem";
import EditItem from "./pages/EditItem";

const App = () => {
  return (
      <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/MainMenu" element={<MainMenu />} />
            <Route path="/SearchItems" element={<SearchForItems />} />
            <Route path="/SearchResults" element={<SearchResults />} />
            <Route path="/ItemDetails" element={<ItemDetails />} />
            <Route path="/AddReviews" element={<AddReview />} />
            <Route path="/ViewReviews" element={<DisplayReviews />} />
            <Route path="/manage/addItem" element={<AddItem />} />
            <Route path="/manage/removeItem" element={<RemoveItem />} />
            <Route path="/manage/editItem" element={<EditItem />} />

        </Routes>
      </>
  );
}

export default App;