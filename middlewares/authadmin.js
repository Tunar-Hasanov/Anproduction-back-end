// middlewares/authadmin.js
const AdminSession = require('../models/adminsession');

const authenticateAdmin = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.status(401).json({ error: 'Daxil olunmamışdır' });
    }

    try {
        const adminSession = await AdminSession.findOne({ sessionId });

        if (!adminSession || adminSession.expiresAt < Date.now()) {
            return res.status(401).json({ message: 'Sessiyanın vaxtı bitdi və ya tapılmadı' });
        }

        req.adminId = adminSession.adminId;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Daxili Server Xətası' });
    }
};

const createAdminSession = async (adminId) => {
    const sessionId = Math.random().toString(36).substr(2, 8);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 60);

    const adminSession = new AdminSession({
        adminId,
        sessionId,
        expiresAt,
    });

    await adminSession.save();

    return { sessionId, expiresAt };
};

module.exports = { authenticateAdmin, createAdminSession };
