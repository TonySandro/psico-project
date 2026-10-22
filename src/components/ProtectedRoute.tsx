import { Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useSubscription } from '@/hooks/useSubscription';
import { Box, CircularProgress } from '@mui/material';
import { isMaintenanceActive, MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';
import { AlertTriangle, LifeBuoy, Mail, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isMaintenance = isMaintenanceActive();

  // Se o sistema estiver em manutenção no backend/banco de dados,
  // exibimos uma tela protetora segura com os contatos de urgência
  if (isMaintenance) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-display">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-200/80 p-8 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5 shadow-sm">
            <AlertTriangle size={34} />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            {MAINTENANCE_CONFIG.badge}
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-2">
            {MAINTENANCE_CONFIG.title}
          </h1>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {MAINTENANCE_CONFIG.message} Para segurança dos dados clínicos de seus pacientes, as consultas e alterações estão temporariamente pausadas.
          </p>

          {/* Box de Urgência */}
          <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300/80 rounded-2xl p-5 mb-6 text-left flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
              <LifeBuoy size={18} className="text-amber-700 shrink-0" />
              <span>{MAINTENANCE_CONFIG.urgencyTitle}</span>
            </div>
            <p className="text-xs text-amber-900/85 leading-relaxed">
              {MAINTENANCE_CONFIG.urgencyMessage}
            </p>
            <div className="pt-1">
              <a
                href={getEmergencyMailtoUrl()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-sm transition-all"
              >
                <Mail size={16} />
                <span>Enviar E-mail para Suporte</span>
              </a>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    );
  }

  const { loading, isExpired } = useSubscription();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
        <CircularProgress size={50} sx={{ color: '#3B82F6' }} />
      </Box>
    );
  }

  if (isExpired) {
    return <Navigate to="/payment/subscribe" replace />;
  }

  return <>{children}</>;
}
