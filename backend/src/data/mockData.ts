// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────

export interface Resident {
  id: string;
  name: string;
  email: string;
  complex: string;
  unit: string;
  pointsBalance: number;
  password: string;
  avatarUrl: string;
}

export interface Complex {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}
export interface Transaction {
  id: string;
  residentId: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: string;
}

export interface RedeemedGiftCard {
  id: string;
  residentId: string;
  giftCardId: string;
  brand: string;
  denomination: number;
  pointsSpent: number;
  redeemedAt: string;
  code: string; // simulated gift card code
}

export interface GiftCard {
  id: string;
  brand: string;
  logo: string;
  pointsCost: number;
  denomination: number;
  category: string;
  imageEmoji: string;
  imageUrl: string;
}

export interface UserProfile {
  resident: Omit<Resident, 'password'>;
  transactions: Transaction[];
  redeemedGiftCards: RedeemedGiftCard[];
  availableGiftCards: GiftCard[];
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─────────────────────────────────────────────
//  SEED DATA — RESIDENTS
// ─────────────────────────────────────────────

export const residents: Resident[] = [
  {
    id: 'res_001',
    name: 'Alex Rivera',
    email: 'alex@casaperks.com',
    complex: 'arboretum',
    unit: '4B',
    pointsBalance: 3250,
    password: 'demo123',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  },
  {
    id: 'res_002',
    name: 'Jordan Kim',
    email: 'jordan@casaperks.com',
    complex: 'washington-heights',
    unit: '7A',
    pointsBalance: 1800,
    password: 'demo456',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan-kim',
  },
  {
    id: 'res_003',
    name: 'Priya Patel',
    email: 'priya@casaperks.com',
    complex: 'maplewood-estates',
    unit: '2C',
    pointsBalance: 5100,
    password: 'demo789',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel',
  },
];

// ─────────────────────────────────────────────
//  SEED DATA — COMPLEXES
// ─────────────────────────────────────────────
export const complexes: Complex[] = [
  {
    id: 'arboretum',
    name: 'Arboretum',
    address: '123 Main St',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'USA',
    phone: '555-123-4567',
    email: 'info@arboretum.com',
    website: 'https://arboretum.com',
  },
  {
    id: 'washington-heights',
    name: 'Washington Heights',
    address: '456 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    phone: '555-456-7890',
    email: 'info@washingtonheights.com',
    website: 'https://washingtonheights.com',
  },
  {
    id: 'maplewood-estates',
    name: 'Maplewood Estates',
    address: '789 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'USA',
    phone: '555-789-0123',
    email: 'info@maplewoodestates.com',
    website: 'https://maplewoodestates.com',
  },
];

// ─────────────────────────────────────────────
//  SEED DATA — GIFT CARDS
// ─────────────────────────────────────────────
export const giftCards: GiftCard[] = [
  {
    id: 'starbucks',
    brand: 'Starbucks',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/d/d3/Starbucks_Corporation_Logo_2011.svg',
    pointsCost: 150,
    denomination: 10,
    category: 'Food & Drink',
    imageEmoji: '☕',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
  },
  {
    id: 'amazon',
    brand: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    pointsCost: 400,
    denomination: 25,
    category: 'Shopping',
    imageEmoji: '📦',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW1hem9uJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'uber-eats',
    brand: 'Uber Eats',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/UberEATS_logo_december_2017.svg',
    pointsCost: 250,
    denomination: 15,
    category: 'Food & Drink',
    imageEmoji: '🍕',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    id: 'target',
    brand: 'Target',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg',
    pointsCost: 500,
    denomination: 30,
    category: 'Shopping',
    imageEmoji: '🎯',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop',
  },
  {
    id: 'netflix',
    brand: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    pointsCost: 300,
    denomination: 20,
    category: 'Entertainment',
    imageEmoji: '🎬',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop',
  },
  {
    id: 'visa-prepaid',
    brand: 'Visa Prepaid',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Visa_Inc._logo_(2005%E2%80%932014).svg',
    pointsCost: 1000,
    denomination: 50,
    category: 'General',
    imageEmoji: '💳',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
  },
];

// ─────────────────────────────────────────────
//  SEED DATA — REDEEMED GIFT CARDS (per resident)
//  Derived from gift card catalog (lines 98–159). Also used for redeemed transactions.
// ─────────────────────────────────────────────

const redeemedGiftCardSeeds: Array<{ residentId: string; giftCardId: string; redeemedAt: string; code: string }> = [
  { residentId: 'res_001', giftCardId: 'starbucks',   redeemedAt: '2026-02-10', code: 'SBUX-A1B2-C3D4' },
  { residentId: 'res_001', giftCardId: 'amazon',      redeemedAt: '2025-12-22', code: 'AMZN-E5F6-G7H8' },
  { residentId: 'res_002', giftCardId: 'uber-eats',   redeemedAt: '2026-02-18', code: 'UBER-I9J0-K1L2' },
  { residentId: 'res_002', giftCardId: 'amazon',      redeemedAt: '2026-01-10', code: 'AMZN-M3N4-O5P6' },
  { residentId: 'res_003', giftCardId: 'netflix',     redeemedAt: '2025-12-10', code: 'NFLX-Q7R8-S9T0' },
  { residentId: 'res_003', giftCardId: 'visa-prepaid', redeemedAt: '2025-11-30', code: 'VISA-U1V2-W3X4' },
];

// ─────────────────────────────────────────────
//  SEED DATA — TRANSACTIONS (per resident)
//  Redeemed transactions derived from gift card catalog (lines 98–159)
// ─────────────────────────────────────────────

const earnedTransactionSeeds: Array<{ residentId: string; points: number; description: string; date: string }> = [
  { residentId: 'res_001', points:  500, description: 'On-time rent payment – March',     date: '2026-03-01' },
  { residentId: 'res_001', points:  200, description: 'Lease renewal bonus',              date: '2026-02-15' },
  { residentId: 'res_001', points:  500, description: 'On-time rent payment – February',  date: '2026-02-01' },
  { residentId: 'res_001', points:  100, description: 'Referral bonus – Unit 3A',         date: '2026-01-20' },
  { residentId: 'res_001', points:  500, description: 'On-time rent payment – January',  date: '2026-01-01' },
  { residentId: 'res_002', points:  500, description: 'On-time rent payment – March',     date: '2026-03-01' },
  { residentId: 'res_002', points:  300, description: 'Community event participation',    date: '2026-02-20' },
  { residentId: 'res_002', points:  500, description: 'On-time rent payment – February',  date: '2026-02-01' },
  { residentId: 'res_002', points:  150, description: 'Survey completion bonus',          date: '2026-01-25' },
  { residentId: 'res_003', points:  500, description: 'On-time rent payment – March',     date: '2026-03-01' },
  { residentId: 'res_003', points:  500, description: 'On-time rent payment – February',  date: '2026-02-01' },
  { residentId: 'res_003', points:  500, description: 'On-time rent payment – January',   date: '2026-01-01' },
  { residentId: 'res_003', points: 1000, description: '1-year loyalty milestone bonus',   date: '2025-12-15' },
  { residentId: 'res_003', points:  200, description: 'Referral bonus – Unit 1D',         date: '2025-11-15' },
  { residentId: 'res_003', points:  500, description: 'On-time rent payment – November',  date: '2025-11-01' },
];

const earnedTransactions: Transaction[] = earnedTransactionSeeds.map((s, i) => ({
  id: `txn_${String(i + 1).padStart(3, '0')}`,
  residentId: s.residentId,
  type: 'earned' as const,
  points: s.points,
  description: s.description,
  date: s.date,
}));

// Redeemed transactions derived from redeemedGiftCardSeeds (same source as redeemedGiftCards)
const redeemedTransactions: Transaction[] = redeemedGiftCardSeeds.map((s, i) => {
  const giftCard = giftCards.find(g => g.id === s.giftCardId)!;
  return {
    id: `txn_${String(earnedTransactionSeeds.length + i + 1).padStart(3, '0')}`,
    residentId: s.residentId,
    type: 'redeemed' as const,
    points: -giftCard.pointsCost,
    description: `Redeemed: ${giftCard.brand} $${giftCard.denomination}`,
    date: s.redeemedAt,
  };
});

// Merge and sort by date descending (newest first) to match original order
export const transactions: Transaction[] = [
  ...earnedTransactions,
  ...redeemedTransactions,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 .map((t, i) => ({ ...t, id: `txn_${String(i + 1).padStart(3, '0')}` }));

export const redeemedGiftCards: RedeemedGiftCard[] = redeemedGiftCardSeeds.map((seed, i) => {
  const giftCard = giftCards.find(g => g.id === seed.giftCardId)!;
  return {
    id: `rgc_${String(i + 1).padStart(3, '0')}`,
    residentId: seed.residentId,
    giftCardId: seed.giftCardId,
    brand: giftCard.brand,
    denomination: giftCard.denomination,
    pointsSpent: giftCard.pointsCost,
    redeemedAt: seed.redeemedAt,
    code: seed.code,
  };
});

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function generateGiftCardCode(brand: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${brand.slice(0, 4).toUpperCase()}-${seg()}-${seg()}`;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

// ─────────────────────────────────────────────
//  GIFT CARD API
// ─────────────────────────────────────────────

export const GiftCardAPI = {
  /** List all available gift cards in the catalog. */
  getCatalog(): ApiResponse<GiftCard[]> {
    return { success: true, data: giftCards };
  },

  /** Get a single gift card by ID. */
  getById(giftCardId: string): ApiResponse<GiftCard> {
    const giftCard = giftCards.find(g => g.id === giftCardId);
    if (!giftCard) return { success: false, error: 'Gift card not found.' };
    return { success: true, data: giftCard };
  },

  /** Get gift cards filtered by category. */
  getByCategory(category: string): ApiResponse<GiftCard[]> {
    const filtered = giftCards.filter(g => g.category === category);
    return { success: true, data: filtered };
  },

  /** Get all gift cards a resident has redeemed. */
  getRedeemed(residentId: string): ApiResponse<RedeemedGiftCard[]> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    return {
      success: true,
      data: redeemedGiftCards.filter(r => r.residentId === residentId),
    };
  },

  /** Redeem a gift card for a resident. Deducts points and creates a transaction + redeemed record. */
  redeem(
    residentId: string,
    giftCardId: string
  ): ApiResponse<{ redeemedGiftCard: RedeemedGiftCard; transaction: Transaction; newBalance: number }> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };

    const giftCard = giftCards.find(g => g.id === giftCardId);
    if (!giftCard) return { success: false, error: 'Gift card not found.' };

    if (resident.pointsBalance < giftCard.pointsCost) {
      return {
        success: false,
        error: `Insufficient points. Need ${giftCard.pointsCost}, have ${resident.pointsBalance}.`,
      };
    }

    resident.pointsBalance -= giftCard.pointsCost;

    const transaction: Transaction = {
      id: generateId('txn'),
      residentId,
      type: 'redeemed',
      points: -giftCard.pointsCost,
      description: `Redeemed: ${giftCard.brand} $${giftCard.denomination}`,
      date: today(),
    };
    transactions.push(transaction);

    const redeemedGiftCard: RedeemedGiftCard = {
      id: generateId('rgc'),
      residentId,
      giftCardId,
      brand: giftCard.brand,
      denomination: giftCard.denomination,
      pointsSpent: giftCard.pointsCost,
      redeemedAt: today(),
      code: generateGiftCardCode(giftCard.brand),
    };
    redeemedGiftCards.push(redeemedGiftCard);

    return {
      success: true,
      data: { redeemedGiftCard, transaction, newBalance: resident.pointsBalance },
    };
  },
};

// ─────────────────────────────────────────────
//  BANK-STYLE API
// ─────────────────────────────────────────────

export const PerksBank = {

  // ── AUTH ──────────────────────────────────

  /** Authenticate a resident by email + password. Returns resident (no password) or error. */
  login(email: string, password: string): ApiResponse<Omit<Resident, 'password'>> {
    const resident = residents.find(r => r.email === email && r.password === password);
    if (!resident) return { success: false, error: 'Invalid email or password.' };
    const { password: _, ...safeResident } = resident;
    return { success: true, data: safeResident };
  },

  // ── ACCOUNT ───────────────────────────────

  /** Get full profile: resident info, transaction history, redeemed cards, catalog. */
  getProfile(residentId: string): ApiResponse<UserProfile> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    const { password: _, ...safeResident } = resident;
    return {
      success: true,
      data: {
        resident: safeResident,
        transactions: transactions
          .filter(t => t.residentId === residentId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        redeemedGiftCards: redeemedGiftCards.filter(r => r.residentId === residentId),
        availableGiftCards: giftCards,
      },
    };
  },

  /** Get current points balance for a resident. */
  getBalance(residentId: string): ApiResponse<{ residentId: string; pointsBalance: number }> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    return { success: true, data: { residentId, pointsBalance: resident.pointsBalance } };
  },

  // ── TRANSACTIONS ──────────────────────────

  /** Get all transactions for a resident, newest first. */
  getTransactions(residentId: string): ApiResponse<Transaction[]> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    const result = transactions
      .filter(t => t.residentId === residentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { success: true, data: result };
  },

  /** Credit points to a resident (e.g. rent payment, bonus). */
  earnPoints(
    residentId: string,
    points: number,
    description: string
  ): ApiResponse<{ transaction: Transaction; newBalance: number }> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    if (points <= 0) return { success: false, error: 'Points must be a positive number.' };

    const transaction: Transaction = {
      id: generateId('txn'),
      residentId,
      type: 'earned',
      points,
      description,
      date: today(),
    };
    transactions.push(transaction);
    resident.pointsBalance += points;

    return { success: true, data: { transaction, newBalance: resident.pointsBalance } };
  },

  /** Debit points from a resident manually (admin use). */
  deductPoints(
    residentId: string,
    points: number,
    description: string
  ): ApiResponse<{ transaction: Transaction; newBalance: number }> {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) return { success: false, error: 'Resident not found.' };
    if (points <= 0) return { success: false, error: 'Points must be a positive number.' };
    if (resident.pointsBalance < points) return { success: false, error: 'Insufficient points balance.' };

    const transaction: Transaction = {
      id: generateId('txn'),
      residentId,
      type: 'redeemed',
      points: -points,
      description,
      date: today(),
    };
    transactions.push(transaction);
    resident.pointsBalance -= points;

    return { success: true, data: { transaction, newBalance: resident.pointsBalance } };
  },

  // ── GIFT CARDS ────────────────────────────

  /** List all available gift cards in the catalog. */
  getGiftCardCatalog(): ApiResponse<GiftCard[]> {
    return GiftCardAPI.getCatalog();
  },

  /** Get all gift cards a resident has redeemed. */
  getRedeemedGiftCards(residentId: string): ApiResponse<RedeemedGiftCard[]> {
    return GiftCardAPI.getRedeemed(residentId);
  },

  /** Redeem a gift card for a resident. Deducts points and creates a transaction + redeemed record. */
  redeemGiftCard(
    residentId: string,
    giftCardId: string
  ): ApiResponse<{ redeemedGiftCard: RedeemedGiftCard; transaction: Transaction; newBalance: number }> {
    return GiftCardAPI.redeem(residentId, giftCardId);
  },

  // ── COMPLEXES ─────────────────────────────

  /** List all complexes. */
  getComplexes(): ApiResponse<Complex[]> {
    return { success: true, data: complexes };
  },

  // ── ADMIN ─────────────────────────────────

  /** List all residents (no passwords). Admin use only. */
  getAllResidents(): ApiResponse<Omit<Resident, 'password'>[]> {
    return {
      success: true,
      data: residents.map(({ password: _, ...r }) => r),
    };
  },

  /** Add a new resident to the system. */
  createResident(
    data: Omit<Resident, 'id'>
  ): ApiResponse<Omit<Resident, 'password'>> {
    const existing = residents.find(r => r.email === data.email);
    if (existing) return { success: false, error: 'A resident with that email already exists.' };

    const newResident: Resident = { id: generateId('res'), ...data };
    residents.push(newResident);
    const { password: _, ...safeResident } = newResident;
    return { success: true, data: safeResident };
  },
};