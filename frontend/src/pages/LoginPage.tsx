import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('alex@casaperks.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-casa-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-casa-accent flex items-center justify-center text-casa-accent-text text-lg font-bold font-display">
              C
            </div>
            <span className="font-display text-2xl font-bold text-casa-text tracking-tight">CasaPerks-Demo</span>
          </div>
          <p className="text-casa-muted text-sm">Resident Rewards Platform</p>
        </div>

        <Card className="bg-casa-card border-casa-border rounded-2xl">
          <CardHeader>
            <CardTitle className="font-display text-xl font-semibold text-casa-text">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-casa-muted">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@casaperks.com"
                  className="bg-casa-card-inner border-casa-border rounded-xl h-11 focus-visible:ring-casa-accent focus-visible:border-casa-accent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-casa-muted">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-casa-card-inner border-casa-border rounded-xl h-11 focus-visible:ring-casa-accent focus-visible:border-casa-accent"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-casa-red/10 border-casa-red/30 text-casa-red [&>svg]:text-casa-red">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-display font-semibold bg-casa-accent text-casa-accent-text hover:bg-casa-accent/90 mt-2"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-stretch border-t border-casa-border pt-6 mt-6">
            <CardDescription className="text-xs text-center">Demo credentials pre-filled above</CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
