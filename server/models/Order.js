const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ name: String, price: Number, quantity: Number }],
    totalAmount: Number,
    status: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], default: "Pending" },
    deliveryAgentLocation: { type: { lat: Number, lng: Number }, default: { lat: 0, lng: 0 } },
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Order", OrderSchema);
