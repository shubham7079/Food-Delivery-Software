import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Menu() {
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("/api/foods", { withCredentials: false })
            .then(res => setFoods(res.data))
            .catch(err => console.error(err));
    }, []);

    const addToCart = (food) => {
        setCart([...cart, food]);
        alert(`${food.name} added to cart!`);
    };

    const submitOrder = async () => {
        // Check if cart is empty
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            // Prepare order data
            const orderData = {
                items: cart.map(item => ({
                    foodId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: cart.filter(cartItem => cartItem._id === item._id).length
                })),
                totalPrice: cart.reduce((total, item) => total + item.price, 0)
            };

            // Send POST request to orders API
            const response = await axios.post("/api/orders", orderData, {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Clear the cart after successful order
            setCart([]);
            alert("Order submitted successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <h1 className="text-3xl font-bold text-center text-red-500">Our Menu</h1>
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {foods.map(food => (
                        <div key={food._id} className="border p-4 rounded-lg shadow-lg bg-white">
                            <img src={food.image} alt={food.name} className="w-full h-40 object-cover rounded-lg" />
                            <h2 className="text-xl font-semibold mt-2">{food.name}</h2>
                            <p className="text-gray-700 font-medium">${food.price.toFixed(2)}</p>
                            <button
                                onClick={() => addToCart(food)}
                                className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition">
                                🛒 Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary and Order Button */}
                {cart.length > 0 && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
                        <div>
                            {/* Group unique items and show quantities */}
                            {[...new Set(cart.map(item => item._id))].map(uniqueId => {
                                const item = cart.find(cartItem => cartItem._id === uniqueId);
                                const quantity = cart.filter(cartItem => cartItem._id === uniqueId).length;
                                return (
                                    <div key={uniqueId} className="flex justify-between mb-2">
                                        <span>{item.name} x {quantity}</span>
                                        <span>${(item.price * quantity).toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={submitOrder}
                            className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-700 transition">
                            Submit Order
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Menu;