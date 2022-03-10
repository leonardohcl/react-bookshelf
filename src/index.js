import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

import { FavoritesProvider } from './providers/favorites';
import Navigation from './components/organisms/Navigation';
import Home from "./pages/Home"
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import NotFound from './pages/404';



ReactDOM.render(
  <BrowserRouter>
    <Navigation />
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books/:id" element={<Details/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </FavoritesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
