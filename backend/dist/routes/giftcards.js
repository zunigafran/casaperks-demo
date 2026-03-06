"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const mockData_1 = require("../data/mockData");
const router = (0, express_1.Router)();
router.use(rateLimiter_1.apiLimiter);
router.use(auth_1.authenticateToken);
const redeemSchema = zod_1.z.object({
    giftCardId: zod_1.z.string().min(1, 'Gift card ID is required'),
});
// GET /api/giftcards
router.get('/', (_req, res) => {
    res.json(mockData_1.giftCards);
});
// POST /api/giftcards/redeem
router.post('/redeem', rateLimiter_1.redeemLimiter, (req, res) => {
    const result = redeemSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.errors[0].message });
        return;
    }
    const { giftCardId } = result.data;
    const apiResult = mockData_1.GiftCardAPI.redeem(req.residentId, giftCardId);
    if (!apiResult.success) {
        res.status(apiResult.error.includes('Insufficient') ? 400 : 404).json({ error: apiResult.error });
        return;
    }
    res.json({
        success: true,
        transaction: apiResult.data.transaction,
        newBalance: apiResult.data.newBalance,
    });
});
exports.default = router;
