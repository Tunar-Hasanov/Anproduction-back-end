// routes/adminlogin.js
const express = require('express');
const bcrypt = require('bcrypt');
const { createAdminSession } = require('../../middlewares/authadmin');
const AdminUser = require('../../models/adminuser');

const adminLogin = express.Router();

adminLogin.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await AdminUser.findOne({ email });

        if (!admin) {
            return res.status(401).json({ error: 'Bu ad ünvanı ilə admin tapılmadı' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Yanlış e-poçt və ya parol' });
        }

        const adminSession = await createAdminSession(admin._id);

        res.cookie('sessionId', adminSession.sessionId, { httpOnly: true });

        res.status(200).json({ message: 'Admin girişi uğurlu oldu', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili Server Xətası' });
    }
});

module.exports = adminLogin;
