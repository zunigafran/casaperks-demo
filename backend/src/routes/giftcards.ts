import { Router, Response } from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { apiLimiter, redeemLimiter } from '../middleware/rateLimiter';
import { giftCards, GiftCardAPI } from '../data/mockData';

const router = Router();

router.use(apiLimiter);
router.use(authenticateToken);

const redeemSchema = z.object({
  giftCardId: z.string().min(1, 'Gift card ID is required'),
});

// GET /api/giftcards
router.get('/', (_req: AuthRequest, res: Response): void => {
  res.json(giftCards);
});

// POST /api/giftcards/redeem
router.post('/redeem', redeemLimiter, (req: AuthRequest, res: Response): void => {
  const result = redeemSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.errors[0].message });
    return;
  }

  const { giftCardId } = result.data;
  const apiResult = GiftCardAPI.redeem(req.residentId!, giftCardId);

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

export default router;
