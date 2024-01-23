// routes/PUT/categoryEditPut
const express = require('express');
const Category = require('../../models/category');
const uploadMiddleware = require('../../utils/uploads');
const categoryEditPost = express.Router();

categoryEditPost.post('/update/category/:id', uploadMiddleware.single('image'), async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        const updatedImage = req.file;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory && existingCategory._id.toString() !== categoryId) {
            return res.status(400).json({ error: 'Bu kategoriyada mal mövcuddur' });
        }

        const updatedCategory = {
            name,
            image: updatedImage ? '/image/' + updatedImage.filename : null,
        };

        const result = await Category.findByIdAndUpdate(categoryId, updatedCategory, { new: true });

        if (!result) {
            return res.status(404).json({ error: 'Kategoriya tapılmadı' });
        }

        res.redirect(`/update/category/${categoryId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Xəta Baş verdi');
    }
});

module.exports = categoryEditPost;
