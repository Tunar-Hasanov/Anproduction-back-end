// routes/DELETE/category-delete
const express = require('express');
const Category = require('../../models/category');
const deleteCategory = express.Router();

deleteCategory.post('/delete/category/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Kateqoriya tapılmadı.' });
    }
    await Category.findByIdAndDelete(categoryId);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Xəta Baş verdi.' });
  }
});

module.exports = deleteCategory;
