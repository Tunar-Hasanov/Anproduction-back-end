// routes/GET/product-add
const express = require('express');
const addProductRouter = express.Router();
const Category = require('../../models/category');

addProductRouter.get('/add/product', async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('add-product', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred');
    }
});

module.exports = addProductRouter;
