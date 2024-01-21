// routes/DELETE/product-delete.js
const express = require('express');
const Product = require('../../models/product');
const productDelete = express.Router();

productDelete.post('/delete/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const result = await Product.findByIdAndDelete(productId);

        if (!result) {
            return res.status(404).json({ message: 'Məhsul tapılmadı' });
        }

        res.json({ message: 'Məhsul uğurla silindi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Xəta Baş verdi' });
    }
});

module.exports = productDelete;
