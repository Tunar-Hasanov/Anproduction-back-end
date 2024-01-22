const express = require("express");
const orderDelete = express.Router();
const Siparis = require("../../models/order");

orderDelete.post('/delete-order/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        await Siparis.findByIdAndDelete(orderId);
        res.redirect('/orders/admin');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Xəta.' });
    }
});

module.exports = orderDelete;
