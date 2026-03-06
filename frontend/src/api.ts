const BASE_URL = 'http://localhost:3001/api';

function getToken(): string | null {
  return localStorage.getItem('casaperks_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data as T;
}

/** Matches backend Omit<Resident, 'password'> */
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

export interface Resident {
  id: string;
  name: string;
  email: string;
  complex: string;
  unit: string;
  pointsBalance: number;
  avatarUrl: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  complexEmail?: string;
  website?: string;
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
  code: string;
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
  resident: Resident;
  transactions: Transaction[];
  redeemedGiftCards: RedeemedGiftCard[];
  availableGiftCards: GiftCard[];
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export const api = {
  login: async (email: string, password: string): Promise<{ token: string; resident: Resident }> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  getMe: async (): Promise<Resident> => {
    const res = await fetch(`${BASE_URL}/residents/me`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getMyComplex: async (): Promise<Complex> => {
    const res = await fetch(`${BASE_URL}/residents/me/complex`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await fetch(`${BASE_URL}/residents/me/profile`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const res = await fetch(`${BASE_URL}/residents/me/transactions`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getGiftCards: async (): Promise<GiftCard[]> => {
    const res = await fetch(`${BASE_URL}/giftcards`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getRedeemedGiftCards: async (): Promise<RedeemedGiftCard[]> => {
    const res = await fetch(`${BASE_URL}/residents/me/redeemed-gift-cards`, { headers: authHeaders() });
    return handleResponse(res);
  },

  redeemGiftCard: async (giftCardId: string): Promise<{ success: boolean; transaction: Transaction; newBalance: number }> => {
    const res = await fetch(`${BASE_URL}/giftcards/redeem`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ giftCardId }),
    });
    return handleResponse(res);
  },
};
