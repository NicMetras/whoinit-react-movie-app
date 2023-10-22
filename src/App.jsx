import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import SearchPage from './SearchPage';
import ActorPage from './ActorPage';
import CastPage from './CastPage';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import "./App.css";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SearchPage />} />
      <Route path="actor" element={<ActorPage />} />
      <Route path="cast" element={<CastPage />} />
    </Route>
  )
)

function App() {
  return (
    <ChakraProvider>
    <div className="App">
    <RouterProvider router={router} />
    </div>
    </ChakraProvider>
  );
}

export default App;
