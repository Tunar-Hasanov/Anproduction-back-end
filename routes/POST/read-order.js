// routes/POST/read-order
const express = require('express');
const MarkRead = express.Router();
const Siparis = require('../../models/order');
const ReadOrder = require('../../models/ReadOrders');

MarkRead.post('/mark-read/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Siparis.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Sipariş Tapilmadi.' });
        }

        order.oxundu = true;
        await order.save();

        const readOrder = new ReadOrder(order.toObject());
        await readOrder.save();

        await Siparis.findByIdAndDelete(orderId);

        res.json({ success: true, message: 'Sipariş ugurlu oxundu.' });
    } catch (error) {
        console.error('Xəta:', error);
        res.status(500).json({ success: false, message: 'xeta.' });
    }
});

module.exports = MarkRead;
