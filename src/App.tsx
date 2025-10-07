import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, NavLink } from "react-router-dom";
import ListView from "./pages/list";
import GalleryView from "./pages/gallery";
import DetailView from "./pages/detail";

function App() {
  return (
    <div className="App">
      <header>
        <nav aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            List
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>
            Gallery
          </NavLink>
        </nav>
        <h1>TMDB Movies Explorer</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/movie/:id" element={<DetailView />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
