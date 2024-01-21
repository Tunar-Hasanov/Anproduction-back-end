/* routes/POST/add-product.js */
const express = require('express');
const productRouter = express.Router();
const Product = require('../../models/product');
const Category = require('../../models/category'); 
const uploadMiddleware = require('../../utils/uploads');

productRouter.post('/', uploadMiddleware.array('images', 20), async (req, res) => {
    try {
        const { name, description, price, trend, isnew, categoryId } = req.body;
        const images = req.files.map(file => ({ imageUrl: '/image/' + file.filename }));

        // Kategori var mı kontrol et
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).send('not correct kategori ID');
        }

        const newProduct = new Product({
            name,
            description,
            price,
            trend: trend === 'true',
            new: isnew === 'true',
            images,
            category: categoryId,
        });

        await newProduct.save();

        res.redirect('/add/article');
    } catch (err) {
        console.error(err);
        res.status(500).send('Xəta baş verdi');
    }
});

module.exports = productRouter;
