import React from "react";
import Navbar from "./components/Navbar"; 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder"; 
import Payment from "./pages/Payment"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route path="/payment/:orderId" element={<Payment />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Payment />} />
                
            </Routes>
        </Router>
    );
}

export default App;
