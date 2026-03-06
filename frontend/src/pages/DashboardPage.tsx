import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { api, Transaction, GiftCard, Complex } from '../api';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

type Tab = 'overview' | 'redeem';

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const txStyle = (type: Transaction['type']) =>
  type === 'earned'
    ? { bg: 'bg-casa-green/10 text-[var(--casa-green)]', sign: '+', color: 'text-[var(--casa-green)]' }
    : { bg: 'bg-casa-red/10 text-[var(--casa-red)]', sign: '', color: 'text-[var(--casa-red)]' };

export default function DashboardPage() {
  const { resident, logout, updateBalance } = useAuth();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [complex, setComplex] = useState<Complex | null>(null);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [txns, cards, complexData] = await Promise.all([
        api.getTransactions(),
        api.getGiftCards(),
        api.getMyComplex(),
      ]);
      setTransactions(txns);
      setGiftCards(cards);
      setComplex(complexData);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRedeem = useCallback(async (giftCardId: string) => {
    setRedeeming(giftCardId);
    try {
      const result = await api.redeemGiftCard(giftCardId);
      updateBalance(result.newBalance);
      setTransactions(prev => [result.transaction, ...prev]);
      toast.success('🎉 Gift card redeemed successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Redemption failed');
    } finally {
      setRedeeming(null);
    }
  }, [updateBalance]);

  const totalEarned = transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.points, 0);
  const totalRedeemed = transactions.filter(t => t.type === 'redeemed').reduce((sum, t) => sum + Math.abs(t.points), 0);

  const stats = [
    { label: 'Balance', value: resident?.pointsBalance ?? 0, color: 'text-[var(--casa-accent)]' },
    { label: 'Total Earned', value: totalEarned, color: 'text-[var(--casa-green)]' },
    { label: 'Redeemed', value: totalRedeemed, color: 'text-[var(--casa-text)]' },
  ];

  return (
    <div className="min-h-screen bg-casa-bg text-[var(--casa-text)]">
      <header className="border-b border-casa-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-casa-accent font-display text-sm font-bold text-[var(--casa-accent-text)]">
              C
            </div>
            <span className="font-display font-bold tracking-tight text-[var(--casa-text)]">
              CasaPerks-Demo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="[&>svg]:absolute" aria-label="Toggle theme">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}>
                  <DropdownMenuRadioItem value="light">
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="h-auto px-0 py-0 text-[var(--casa-muted)] hover:text-[var(--casa-text)]"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Card className="bg-casa-card border-casa-border rounded-2xl">
          <CardHeader className="pb-6">
            <CardDescription className="text-[var(--casa-muted)]">Welcome back,</CardDescription>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={resident?.avatarUrl} />
                <AvatarFallback>{resident?.name?.[0] ?? ''}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-display text-3xl font-bold text-[var(--casa-text)]">
                {resident?.name}
              </CardTitle>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-[var(--casa-muted)] hover:text-[var(--casa-text)] h-auto p-1 font-normal"
                  >
                    Unit {resident?.unit}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" className="bg-casa-card border-casa-border space-y-1">
                  {complex?.name && (
                    <p className="text-sm font-medium text-[var(--casa-text)]">{complex.name}</p>
                  )}
                  {(complex?.address || complex?.city) && (
                    <p className="text-sm text-[var(--casa-muted)]">
                      {[complex?.address, complex?.city, complex?.state, complex?.zip]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  )}
                  {complex?.phone && (
                    <p className="text-sm text-[var(--casa-muted)]">{complex.phone}</p>
                  )}
                  {complex?.email && (
                    <p className="text-sm text-[var(--casa-muted)]">{complex.email}</p>
                  )}
                  {complex?.website && (
                    <a
                      href={complex.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--casa-muted)] hover:text-[var(--casa-text)]"
                    >
                      {complex.website}
                    </a>
                  )}
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ label, value, color }) => (
                <Card key={label} className="bg-casa-card-inner border-casa-border rounded-xl">
                  <CardContent className="p-4">
                    <CardDescription className="text-sm uppercase tracking-wider mb-1">{label}</CardDescription>
                    <p className={`font-display text-2xl font-semibold tracking-wider ${color}`}>{value.toLocaleString()}</p>
                    <p className="text-sm text-[var(--casa-muted)] mt-0.5">pts</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="flex flex-col gap-4">
          <TabsList className="flex h-auto w-fit gap-1 rounded-xl border border-casa-border bg-casa-card p-1">
            <TabsTrigger
              value="overview"
              className="rounded-lg px-5 py-2 font-display text-sm font-medium data-[state=active]:bg-casa-accent data-[state=active]:text-[var(--casa-accent-text)] data-[state=inactive]:text-[var(--casa-muted)] data-[state=inactive]:hover:text-[var(--casa-text)]"
            >
              Transaction History
            </TabsTrigger>
            <TabsTrigger
              value="redeem"
              className="rounded-lg px-5 py-2 font-display text-sm font-medium data-[state=active]:bg-casa-accent data-[state=active]:text-[var(--casa-accent-text)] data-[state=inactive]:text-[var(--casa-muted)] data-[state=inactive]:hover:text-[var(--casa-text)]"
            >
              Redeem Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            {loading ? (
              <Card className="bg-casa-card border-casa-border rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-casa-border">
                  <Skeleton className="h-5 w-40 bg-casa-border" />
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full bg-casa-border" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-casa-border" />
                        <Skeleton className="h-3 w-24 bg-casa-border" />
                      </div>
                      <Skeleton className="h-4 w-16 bg-casa-border" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-casa-card border-casa-border rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-casa-border py-4">
                  <CardTitle className="font-display font-semibold text-[var(--casa-text)]">Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-casa-border">
                    {transactions.length === 0 ? (
                      <p className="px-6 py-8 text-[var(--casa-muted)] text-sm text-center">No transactions yet</p>
                    ) : transactions.map(txn => {
                      const s = txStyle(txn.type);
                      return (
                        <div
                          key={txn.id}
                          className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-casa-card-inner/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-3xl font-light ${s.bg}`}>
                              {txn.type === 'earned' ? '↑' : '↓'}
                            </div>
                            <div>
                              <p className="text-base text-[var(--casa-text)]">{txn.description}</p>
                              <p className="text-sm text-[var(--casa-muted)] mt-0.5">{formatDate(txn.date)}</p>
                            </div>
                          </div>
                          <span className={`font-display font-medium text-base ${s.color}`}>{s.sign}{txn.points} pts</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="redeem" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="bg-casa-card border-casa-border overflow-hidden">
                    <CardContent className="p-5 space-y-3">
                      <Skeleton className="h-12 w-12 rounded-xl bg-casa-border" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-casa-border" />
                        <Skeleton className="h-3 w-20 bg-casa-border" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-16 bg-casa-border" />
                        <Skeleton className="h-8 w-16 rounded-lg bg-casa-border" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {giftCards.map(card => {
                  const canAfford = (resident?.pointsBalance ?? 0) >= card.pointsCost;
                  return (
                    <Card
                      key={card.id}
                      className={`flex flex-col gap-3 transition-all overflow-hidden ${
                        canAfford ? 'border-casa-border hover:border-casa-accent/40' : 'border-casa-border opacity-50'
                      }`}
                      style={{
                        backgroundImage: `url(${card.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <CardContent className="p-5 flex flex-col gap-3 relative bg-black/50 backdrop-blur-[2px]">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-casa-border flex items-center justify-center">
                          {card.logo ? (
                            <img
                              src={card.logo}
                              alt={card.brand}
                              className="h-full w-full object-contain bg-white"
                            />
                          ) : (
                            <span className="text-2xl">{card.imageEmoji}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="font-display font-semibold text-white text-base">{card.brand}</CardTitle>
                          <CardDescription className="text-xs text-white">${card.denomination} gift card</CardDescription>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-display text-sm font-semibold text-[var(--casa-accent)]">
                            {card.pointsCost.toLocaleString()} pts
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleRedeem(card.id)}
                            disabled={!canAfford || redeeming === card.id}
                            className="h-8 px-3 font-display text-xs font-semibold bg-casa-accent text-[var(--casa-accent-text)] hover:bg-casa-accent/80"
                          >
                            {redeeming === card.id ? '…' : 'Redeem'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
