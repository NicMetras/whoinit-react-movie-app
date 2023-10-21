import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import ActorPage from './ActorPage';
import CastPage from './CastPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">Whoinit</Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/search" className="nav-link">Search</Link>
              </li>
              <li className="nav-item">
                <Link to="/actor" className="nav-link">Actor Search</Link>
              </li>
              <li className="nav-item">
                <Link to="/cast" className="nav-link">Cast Search</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/actor" element={<ActorPage />} />
          <Route path="/cast" element={<CastPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
