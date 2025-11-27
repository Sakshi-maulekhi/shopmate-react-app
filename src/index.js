import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import MenCategory from './components/MenCategory';
import WomenCategory from './components/WomenCategory';
import ElectronicsCategory from './components/ElectronicsCategory';
import AccessoriesCategory from './components/AccessoriesCategory';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Home';
import ContactUs from './components/ContactUs';
import ProductDetails from './pages/ProductDetail'; // <-- ADD THIS
import PlaceOrder from './pages/PlaceOrder';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />}>
          {/* Main pages */}
          <Route index element={<Home />} />
          <Route path="men" element={<MenCategory />} />
          <Route path="women" element={<WomenCategory />} />
          <Route path="electronics" element={<ElectronicsCategory />} />
          <Route path="accessories" element={<AccessoriesCategory />} />
          <Route path="contact" element={<ContactUs />} />

          {/* Auth pages */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* ⭐ NEW Product Details Dynamic Route */}
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="place-order" element={<PlaceOrder />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
