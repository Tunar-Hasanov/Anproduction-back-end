// routes/GET/product-edit.js

const express = require('express');
const productEditRouter = express.Router();
const Category = require('../../models/category');
const Product = require('../../models/product');

productEditRouter.get('/edit/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        const categories = await Category.find();

        if (!product) {
            return res.status(404).send('Məhsul tapılmadı');
        }

        res.render('editProduct', { product, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Xəta Baş verdi');
    }
});

module.exports = productEditRouter;
