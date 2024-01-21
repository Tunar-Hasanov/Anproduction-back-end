// routes/GET/category-edit

const express = require('express');
const Category = require('../../models/category');
const categoryUpdateGet = express.Router();

categoryUpdateGet.get('/update/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.render('update-category', { category });
    } catch (err) {
        console.error(err);
        res.status(500).send('Xəta Baş verdi');
    }
});

module.exports = categoryUpdateGet;
