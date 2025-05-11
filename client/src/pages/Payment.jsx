import React from "react";
import { QRCodeCanvas } from "qrcode.react"; 

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Payment() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const googlePayURL = `https://pay.google.com/gp/v/inapp/?pa=your-google-pay-shubham7079-3@oksbi=YourRestaurant&mc=0000&tid=123456&tr=${orderId}&tn=FoodOrder&am=500&cu=INR`;

    const markAsPaid = async () => {
        try {
            await axios.post("api/payment/mark-paid", { orderId });
            alert("Payment Successful!");
            navigate("/orders");
        } catch (error) {
            alert("Error: " + error.response.data.message);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            <QRCodeCanvas value={googlePayURL} size={200} />
            <p className="mt-4">Scan this QR code to pay via Google Pay</p>
            <button onClick={markAsPaid} className="bg-green-500 text-white px-4 py-2 mt-3">
                Mark as Paid
            </button>
        </div>
        </>
        
    );
}

export default Payment;
