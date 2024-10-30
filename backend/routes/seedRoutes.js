import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Deleting old products
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    console.log("Old products deleted and new products created.");

    // Deleting old users
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    console.log("Old users deleted and new users created.");

    // Send the response
    res.send({ createdProducts, createdUsers });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).send({ message: 'Error seeding data' }); 
  }
});

export default seedRouter;

