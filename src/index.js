import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import MenCategory from './components/MenCategory';
import WomenCategory from './components/WomenCategory';
import KidsCategory from './components/KidsCategory';
import AccessoriesCategory from './components/AccessoriesCategory';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='men' element={<MenCategory />} />
          <Route path='women' element={<WomenCategory />} />
          <Route path='kids' element={<KidsCategory />} />
          <Route path='accessories' element={<AccessoriesCategory />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
