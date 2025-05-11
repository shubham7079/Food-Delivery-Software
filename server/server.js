const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

// Set up middleware first
const corsOptions = {
    origin: 'http://localhost:5174', 
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());

// Then set up routes
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Food Ordering API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));