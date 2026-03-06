import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { residents } from '../data/mockData';
import { signToken } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

router.post('/login', authLimiter, (req: Request, res: Response): void => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.errors[0].message });
    return;
  }

  const { email, password } = result.data;
  const resident = residents.find(r => r.email === email && r.password === password);

  if (!resident) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = signToken(resident.id);
  const { password: _, ...safeResident } = resident;
  res.json({ token, resident: safeResident });
});

export default router;
