// models/adminuser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash
adminUserSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password') || admin.isNew) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
    }
    next();
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
