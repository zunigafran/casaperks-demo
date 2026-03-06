import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';
import { residents, transactions, complexes } from '../data/mockData';

const router = Router();

router.use(apiLimiter);
router.use(authenticateToken);

// GET /api/residents/me
router.get('/me', (req: AuthRequest, res: Response): void => {
  const resident = residents.find(r => r.id === req.residentId);
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' });
    return;
  }

  const { password, ...safeResident } = resident;
  res.json(safeResident);
});

// GET /api/residents/me/transactions
router.get('/me/transactions', (req: AuthRequest, res: Response): void => {
  const myTransactions = transactions
    .filter(t => t.residentId === req.residentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json(myTransactions);
});

// GET /api/residents/me/complex
router.get('/me/complex', (req: AuthRequest, res: Response): void => {
  const resident = residents.find(r => r.id === req.residentId);
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' });
    return;
  }

  const complex = complexes.find(c => c.id === resident.complex);
  if (!complex) {
    res.status(404).json({ error: 'Complex not found' });
    return;
  }

  res.json(complex);
});

export default router;
