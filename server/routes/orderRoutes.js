const express = require("express");
const router =express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const app= express();

// Place an Order
router.post("/place", authMiddleware, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const newOrder = new Order({ userId: req.user.id, items, totalAmount });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get User Orders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Order Status (Admin)
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Update Delivery Agent Location
router.put("/update-location/:id", async (req, res) => {
    try {
        const { lat, lng } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { deliveryAgentLocation: { lat, lng }, status: "Out for Delivery" }, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
