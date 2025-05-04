const express = require('express');
const router = express.Router();
const Shipping = require('../../models/shipping');


router.post('/add', async (req, res) => {
  try {
    const { username, email, address, method} = req.body;





    if (!username || !email || !address || !method ) {
      console.warn('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newShipping = new Shipping({
      username,
      email,
      address,
      method,
    });


    const savedShipping = await newShipping.save();


    res.status(201).json({
      success: true,
      message: 'Shipping added successfully.',
      shipping: savedShipping
    });
  } catch (error) {

    res.status(500).json({ error: 'Server error.', details: error.message });
  }
});

module.exports = router;
