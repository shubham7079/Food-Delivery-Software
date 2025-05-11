const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const app=express();
const foodItems = [
    { name: "Margherita Pizza", image: "https://unsplash.com/photos/a-slice-of-pepperoni-pizza-being-held-by-a-wooden-spatula-hyNy3oihPuw", price: 820 },
    { name: "Veg Burger", image: "https://via.placeholder.com/150", price: 410 },
    { name: "Pasta Alfredo", image: "https://via.placeholder.com/150", price: 656 },
    { name: "Tandoori Chicken", image: "https://via.placeholder.com/150", price: 984 },
    { name: "Paneer Tikka", image: "https://via.placeholder.com/150", price: 738 },
    { name: "Chocolate Cake", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Caesar Salad", image: "https://via.placeholder.com/150", price: 574 },
    { name: "Grilled Sandwich", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Fried Rice", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Chicken Biryani", image: "https://via.placeholder.com/150", price: 902 },
    { name: "Spring Rolls", image: "https://via.placeholder.com/150", price: 410 },
    { name: "Fish Curry", image: "https://via.placeholder.com/150", price: 1066 },
    { name: "Mutton Rogan Josh", image: "https://via.placeholder.com/150", price: 1230 },
    { name: "Butter Naan", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Vegetable Stir Fry", image: "https://via.placeholder.com/150", price: 656 },
    { name: "Lemon Tart", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Grilled Chicken", image: "https://via.placeholder.com/150", price: 1148 },
    { name: "Pancakes", image: "https://via.placeholder.com/150", price: 410 },
    { name: "French Fries", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Shrimp Cocktail", image: "https://via.placeholder.com/150", price: 820 },
    { name: "Veggie Wrap", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Chicken Wings", image: "https://via.placeholder.com/150", price: 738 },
    { name: "Ice Cream Sundae", image: "https://via.placeholder.com/150", price: 574 },
    { name: "Garlic Bread", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Samosa", image: "https://via.placeholder.com/150", price: 164 },
    { name: "Chow Mein", image: "https://via.placeholder.com/150", price: 656 },
    { name: "Egg Roll", image: "https://via.placeholder.com/150", price: 410 },
    { name: "Cupcake", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Dal Makhani", image: "https://via.placeholder.com/150", price: 656 },
    { name: "Masala Dosa", image: "https://via.placeholder.com/150", price: 574 },
    { name: "Cheese Pizza", image: "https://via.placeholder.com/150", price: 820 },
    { name: "Veggie Salad", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Tomato Soup", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Grilled Paneer", image: "https://via.placeholder.com/150", price: 738 },
    { name: "Chicken Kebab", image: "https://via.placeholder.com/150", price: 902 },
    { name: "Mango Lassi", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Stuffed Paratha", image: "https://via.placeholder.com/150", price: 410 },
    { name: "Spaghetti Carbonara", image: "https://via.placeholder.com/150", price: 738 },
    { name: "Vegetable Curry", image: "https://via.placeholder.com/150", price: 656 },
    { name: "Brownie", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Strawberry Milkshake", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Fruit Salad", image: "https://via.placeholder.com/150", price: 410 },
    { name: "Chicken Tikka", image: "https://via.placeholder.com/150", price: 984 },
    { name: "Veg Pulao", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Crispy Corn", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Carrot Halwa", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Onion Rings", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Chocolate Mousse", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Dhokla", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Spinach Soup", image: "https://via.placeholder.com/150", price: 492 },
    { name: "Mutton Biryani", image: "https://via.placeholder.com/150", price: 1230 },
    { name: "Prawn Curry", image: "https://via.placeholder.com/150", price: 1066 },
    { name: "Falooda", image: "https://via.placeholder.com/150", price: 328 },
    { name: "Papdi Chaat", image: "https://via.placeholder.com/150", price: 246 },
    { name: "Egg Curry", image: "https://via.placeholder.com/150", price: 492 },
];



router.get("/seed", async (req, res) => {
    try {
        await Food.deleteMany({});
        await Food.insertMany(foodItems);
        res.status(200).json({ message: "Food items seeded successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", async (req, res) => {
    const newFood = new Food(req.body);
    try {
        const savedFood = await newFood.save();
        res.json(savedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
