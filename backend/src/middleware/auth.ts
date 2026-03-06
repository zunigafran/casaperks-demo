import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'casaperks-dev-secret-change-in-prod';

export interface AuthRequest extends Request {
  residentId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { residentId: string };
    req.residentId = payload.residentId;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const signToken = (residentId: string): string => {
  return jwt.sign({ residentId }, JWT_SECRET, { expiresIn: '24h' });
};
