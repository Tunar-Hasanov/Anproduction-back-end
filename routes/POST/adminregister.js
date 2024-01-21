// routes/adminregister.js
const express = require('express');
const AdminUser = require('../../models/adminuser');
const AdminSession = require('../../models/adminsession');

const adminRegister = express.Router();

adminRegister.post('/', async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingAdmin = await AdminUser.findOne({ name });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Bu ad artıq qeydiyyatdan keçib' });
        }

        const newAdmin = new AdminUser({ name, password });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin qeydiyyatı uğurla tamamlandı', admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili Server Xətası' });
    }
});

module.exports = adminRegister;
