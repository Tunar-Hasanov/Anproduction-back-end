// routes/PUT/product-update.js
const express = require('express');
const Product = require('../../models/product');
const Category = require('../../models/category');
const uploadMiddleware = require('../../utils/uploads');
const productEditPut = express.Router();

productEditPut.post('/update/product/:id', uploadMiddleware.array('images', 20), async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, trend, isNew, categoryId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'Not found kategory ID' });
        }

        const updatedImages = req.files;

        const updatedProduct = {
            name,
            description,
            price,
            trend: trend === 'true',
            new: isNew === 'true',
            images: updatedImages ? updatedImages.map(image => ({ imageUrl: '/image/' + image.filename })) : [],
            category: categoryId,
        };

        const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Məhsul tapılmadı' });
        }

        res.redirect(`/edit/product/${productId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Xəta Baş verdi');
    }
});

module.exports = productEditPut;
