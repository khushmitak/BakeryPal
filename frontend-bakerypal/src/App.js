import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/UserLogin';
import Register from './pages/UserRegistration';
import MainMenu from './pages/MainMenu';
import SearchForItems from "./pages/SearchForItems";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
      <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/MainMenu" element={<MainMenu />} />
            <Route path="/SearchItems" element={<SearchForItems />} />
            <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </>
  );
}

export default App;