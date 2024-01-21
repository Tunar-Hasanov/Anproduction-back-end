// routes/POST/add-category.js
const Category = require('../../models/category');
const uploadMiddleware = require('../../utils/uploads');
const express = require('express');
const addCategory = express.Router();

addCategory.post('/', uploadMiddleware.single('imageUrl'), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = '/image/' + (req.file ? req.file.filename : '');

    if (!imageUrl) {
      return res.status(400).json({ error: 'Şəkil yükləmə məcburidir.' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Bu adda kateqoriya artıq mövcuddur.' });
    }

    const newCategory = new Category({
      name,
      imageUrl,
    });

    await newCategory.save();
    res.redirect('/add-category');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Xəta Baş verdi.' });
  }
});

module.exports = addCategory;
