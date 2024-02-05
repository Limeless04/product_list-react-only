// routes.js
import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/App';
import ProductDetail from '../pages/ProductDetail';
import ProductPage from '../pages/ProductPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/product" element={<ProductPage />} />
    </Routes>
  );
};

export default AppRoutes;
