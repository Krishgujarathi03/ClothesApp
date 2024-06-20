import React from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home ";
import Category from "./pages/category/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/loginsignup/LoginSignup";
import Footer from "./components/footer/Footer";
import men_banner from "./components/assets/banner_mens.png";
import women_banner from "./components/assets/banner_women.png";
import kid_banner from "./components/assets/banner_kids.png";
import { Toaster } from "react-hot-toast";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import MyOrders from "./pages/myOrders/MyOrders";

const App = () => {
  const backend_URL = "http://localhost:4000";
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mens"
            element={<Category category="Mens" banner={men_banner} />}
          />
          <Route
            path="/womens"
            element={<Category category="Womens" banner={women_banner} />}
          />
          <Route
            path="/kids"
            element={<Category category="Kids" banner={kid_banner} />}
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={<LoginSignup backend_URL={backend_URL} />}
          />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
