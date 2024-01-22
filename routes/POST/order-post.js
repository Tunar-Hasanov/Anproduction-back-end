const express = require('express');
const orderPost = express.Router();
const Siparis = require('../../models/order');

orderPost.post('/', (req, res) => {
    const { adSoyad, mobilNomre, tesvir } = req.body;

    const yeniSiparis = new Siparis({
        adSoyad,
        mobilNomre,
        tesvir
    });

    yeniSiparis.save()
        .then(() => {
            res.redirect('/contact');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Sipariş Alınırken Hata Oluştu');
        });
});

module.exports = orderPost;
