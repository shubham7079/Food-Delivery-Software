const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Mark Order as Paid
router.post("/mark-paid", async (req, res) => {
    try {
        const { orderId } = req.body;
        await Order.findByIdAndUpdate(orderId, { status: "Paid" });
        res.json({ message: "Order marked as paid" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
