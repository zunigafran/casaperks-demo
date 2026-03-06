import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import residentRoutes from './routes/residents';
import giftCardRoutes from './routes/giftcards';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/giftcards', giftCardRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🏠 CasaPerks API running on http://localhost:${PORT}`);
  console.log(`📋 Demo credentials: alex@casaperks.com / demo123\n`);
});

export default app;
