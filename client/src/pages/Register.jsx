import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/register", formData);
            alert("Registration successful!");
        } catch (error) {
            alert("Error: " + error.response.data.message);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="border p-2 w-full mt-2" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="border p-2 w-full mt-2" onChange={handleChange} required />
                <button type="submit" className="bg-red-500 text-white px-4 py-2 mt-3 w-full">Register</button>
            </form>
        </div>
        </>
        
    );
}

export default Register;
