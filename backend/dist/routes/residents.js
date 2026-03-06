"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const mockData_1 = require("../data/mockData");
const router = (0, express_1.Router)();
router.use(rateLimiter_1.apiLimiter);
router.use(auth_1.authenticateToken);
// GET /api/residents/me
router.get('/me', (req, res) => {
    const resident = mockData_1.residents.find(r => r.id === req.residentId);
    if (!resident) {
        res.status(404).json({ error: 'Resident not found' });
        return;
    }
    const { password, ...safeResident } = resident;
    res.json(safeResident);
});
// GET /api/residents/me/transactions
router.get('/me/transactions', (req, res) => {
    const myTransactions = mockData_1.transactions
        .filter(t => t.residentId === req.residentId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(myTransactions);
});
// GET /api/residents/me/complex
router.get('/me/complex', (req, res) => {
    const resident = mockData_1.residents.find(r => r.id === req.residentId);
    if (!resident) {
        res.status(404).json({ error: 'Resident not found' });
        return;
    }
    const complex = mockData_1.complexes.find(c => c.id === resident.complex);
    if (!complex) {
        res.status(404).json({ error: 'Complex not found' });
        return;
    }
    res.json(complex);
});
exports.default = router;
