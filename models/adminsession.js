// models/adminsession.js
const mongoose = require('mongoose');

const adminSessionSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
    sessionId: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
});

const AdminSession = mongoose.model('AdminSession', adminSessionSchema);

module.exports = AdminSession;
