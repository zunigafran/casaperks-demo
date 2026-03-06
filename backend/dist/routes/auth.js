"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const mockData_1 = require("../data/mockData");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
router.post('/login', rateLimiter_1.authLimiter, (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.errors[0].message });
        return;
    }
    const { email, password } = result.data;
    const resident = mockData_1.residents.find(r => r.email === email && r.password === password);
    if (!resident) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
    }
    const token = (0, auth_1.signToken)(resident.id);
    const { password: _, ...safeResident } = resident;
    res.json({ token, resident: safeResident });
});
exports.default = router;
