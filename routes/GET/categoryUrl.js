// routes/GET/categoryUrl.js
const express = require('express');
const categoryRoute = express.Router();
const path = require('path');
const Category = require('../../models/category');
const Product = require('../../models/product');

categoryRoute.get('/categories/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).send('Kategori tapılmadı.');
    }

    const products = await Product.find({ category: category._id });

    res.render('category-page', { category, products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Xəta Baş verdi.');
  }
});

module.exports = categoryRoute;
