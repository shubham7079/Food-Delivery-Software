import React from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Menu from "../pages/Menu";
function Home() {
    return (
        <>
        <Navbar/>
        <div className="text-center bg-gray-100 py-10"
        >
            <h1 className="text-4xl font-bold text-red-500">Welcome to Tasty Foods</h1>
            <p className="text-gray-700 mt-2">Order delicious meals online with fast delivery.</p>
            
            <Link to="/menu">
            <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition" >
                Order Now
            </button>
            </Link>
        </div>
        </>
        
    );
}

export default Home;
