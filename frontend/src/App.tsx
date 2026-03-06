import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const { resident, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-casa-bg flex items-center justify-center">
        <div className="text-casa-muted text-sm">Loading…</div>
      </div>
    );
  }

  return resident ? <DashboardPage /> : <LoginPage />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
