import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/addProduct/AddProduct";
import ListProduct from "./components/listProduct/ListProduct";
import { Toaster } from "react-hot-toast";
import Orders from "./components/orders/Orders";

const App = () => {
  const backend_URL = "https://clothesapp-backend.onrender.com";

  return (
    <div>
      <Navbar />
      <div className="app">
        <Sidebar />
        <Routes>
          <Route
            path="/addproduct"
            element={<AddProduct backend_URL={backend_URL} />}
          />
          <Route
            path="/listproducts"
            element={<ListProduct backend_URL={backend_URL} />}
          />
          <Route
            path="/orders"
            element={<Orders backend_URL={backend_URL} />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
