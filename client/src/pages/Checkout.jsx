import React from "react";
import QRCode from "react-qr-code";
import Navbar from "../components/Navbar";
function Checkout() {
    const gpayLink = "upi://pay?pa=your-upi-shubham7079@ybl=YourName&am=100&cu=INR";

    return (
        <>
        <Navbar/>
        <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-red-500">Checkout</h1>
            <p className="text-gray-700">Scan the QR Code to Pay via Google Pay</p>
            <QRCode value={gpayLink} size={200} className="mx-auto mt-4" />
        </div>
        </>
        
    );
}

export default Checkout;
