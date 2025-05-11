import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                
                const token = localStorage.getItem("token");
                
                if (!token) {
                    
                    navigate("/login");
                    return;
                }
                
                
                const res = await axios.get("/api/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setOrders(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Please try again.");
                setLoading(false);
               
                if (err.response && err.response.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) return <p className="text-center py-10">Loading orders...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-3xl font-bold text-center text-red-500"> Your Order</h2>
                {/* <h2 className="text-2xl font-bold mb-4">Your Orders</h2> */}
                
                {orders.length === 0 ? (
                    <p className="text-center py-5">You have no orders yet.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="p-4 mb-4 border rounded shadow">
                            <p className="text-lg font-semibold">Order ID: {order._id}</p>
                            <p>Status: <span className="font-bold text-blue-600">{order.status}</span></p>
                            <p>Total: ₹{order.totalAmount}</p>

                            {order.status === "Pending" && (
                                <Link to={`/payment/${order._id}`} className="bg-blue-500 text-white px-4 py-2 mt-3 rounded inline-block">
                                    Pay Now
                                </Link>
                            )}
                            {order.status === "Out for Delivery" && (
                                <Link to={`/track-order/${order._id}`} className="bg-green-500 text-white px-4 py-2 mt-3 rounded inline-block">
                                    Track Order
                                </Link>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Orders;