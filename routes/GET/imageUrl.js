// routes/imageUrl.js
const express = require('express');
const path = require('path');

const app = express();
const imagePath = express.Router();

imagePath.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;

    const imagePath = path.join(__dirname, '../../public/uploads/', imageName);

    res.sendFile(imagePath);
});

module.exports = imagePath;
