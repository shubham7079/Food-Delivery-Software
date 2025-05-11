import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Food2Door</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/menu" className="hover:text-yellow-300">Menu</Link>
        <Link to="/cart" className="hover:text-yellow-300">Cart</Link>
        <Link to="/login" className="hover:text-yellow-300">Login</Link>
        <Link to="/register" className="hover:text-yellow-300">Register</Link>
        <Link to="/orders" className="hover:text-yellow-300">Orders</Link>
       

      </div>
    </nav>
  );
}

export default Navbar;
