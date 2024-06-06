const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 2000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB Schemas and Models
const productSchema = new mongoose.Schema({
  // Define your product schema
  name: String,
  price: Number,
  // ... other fields
});

const userSchema = new mongoose.Schema({
  // Define your user schema
  username: String,
  email: String,
  // ... other fields
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

// Define Routes
app.get('/products', async (req, res) => {
  try {
    // Fetch products from MongoDB and send as JSON
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    // Fetch users from MongoDB and send as JSON
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});