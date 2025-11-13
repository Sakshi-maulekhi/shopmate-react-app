import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import MenCategory from './components/MenCategory';
import { BrowserRouter, Route, Routes } from 'react-router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/men' element={<MenCategory />} />
    </Routes>
  </BrowserRouter>
);
