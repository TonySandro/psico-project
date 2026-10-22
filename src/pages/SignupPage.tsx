import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup, useLogin } from '@/hooks/useAuth';
import signupImg from '../images/profissional-analisando-dados-neuropsicopedagogicos-nppavalia.webp';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Check,
  AlertCircle,
  HeartPulse,
  ArrowLeft,
  AlertTriangle,
  LifeBuoy,
  Copy
} from 'lucide-react';
import { isMaintenanceActive, MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';
import MaintenanceModal from '@/components/MaintenanceModal';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isMaintenance = isMaintenanceActive();
  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const { mutate: login, isPending: isLoginPending } = useLogin();

  const isPending = isSignupPending || isLoginPending;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MAINTENANCE_CONFIG.supportEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isMaintenance && MAINTENANCE_CONFIG.blockLogin) {
      setShowMaintenanceModal(true);
      return;
    }

    setErrorMessage('');

    if (password !== passwordConfirmation) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Aceite os termos para continuar');
      return;
    }

    signup({ name, email, password, passwordConfirmation }, {
      onSuccess: () => {
        login({ email, password }, {
          onSuccess: () => {
            navigate('/app/dashboard');
          },
          onError: () => {
            navigate('/login');
          }
        });
      },
      onError: (error: any) => {
        const errorMsg = error.response?.data?.error || 'Erro ao criar conta. Tente novamente.';
        setErrorMessage(errorMsg);
      }
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      {/* Left Side: Visual / Branding (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 relative bg-primary/5 items-center justify-center p-12 overflow-hidden border-r border-slate-200/50">
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center opacity-90 transition-all duration-700 hover:scale-105"
          role="img"
          aria-label="Profissional da saúde analisando dados neuropsicopedagógicos - NPPAvalia"
          style={{ backgroundImage: `url(${signupImg})` }}
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-md text-white">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
            <HeartPulse size={36} />
          </div>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-xs font-bold text-white uppercase tracking-wider">NPPAvalia - Plataforma Clínica</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Padronize seus atendimentos e avaliações.
          </h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Economize horas preenchendo relatórios manuais. Tenha testes e protocolos organizados em um único lugar.
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto px-6 py-8 sm:px-12 md:px-16 justify-center items-center relative">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>
        </div>

        <div className="w-full max-w-[440px] my-auto pt-10 sm:pt-0">
          {/* Logo / Brand Mobile */}
          <div className="flex items-center gap-2 mb-6 text-primary">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-bold">NPPAvalia</span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Cadastre-se na Plataforma</h2>
            <p className="text-slate-500 text-base">Experimente o NPPAvalia gratuitamente e revolucione sua rotina clínica.</p>
          </div>

          {/* Aviso de Manutenção em Destaque */}
          {isMaintenance && (
            <div
              role="alert"
              className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <AlertTriangle size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
                    {MAINTENANCE_CONFIG.badge}
                  </div>
                  <h3 className="font-bold text-base text-amber-950 leading-tight">
                    {MAINTENANCE_CONFIG.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900/85 mt-1 leading-relaxed">
                    {MAINTENANCE_CONFIG.message} Novos cadastros estão temporariamente pausados.
                  </p>
                </div>
              </div>

              {/* Box de Urgência */}
              <div className="bg-white rounded-xl p-3 border border-amber-200 shadow-xs flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs">
                  <LifeBuoy size={15} className="text-amber-700 shrink-0" />
                  <span>{MAINTENANCE_CONFIG.urgencyTitle}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <a
                    href={getEmergencyMailtoUrl()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
                  >
                    <Mail size={13} />
                    <span>Falar com Suporte</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-xs transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} className="text-green-600" />
                        <span className="text-green-700 font-bold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-amber-700" />
                        <span>Copiar e-mail</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1.5 Group">
              <label className="text-sm font-semibold text-slate-700" htmlFor="name">Nome Completo</label>
              <div className="relative group">
                <input
                  className="w-full h-12 px-4 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria Silva"
                  type="text"
                  required
                  autoComplete="name"
                />
                <User className="absolute right-4 top-3 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={20} />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">E-mail Profissional</label>
              <div className="relative group">
                <input
                  className="w-full h-12 px-4 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maria@clinica.com"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Mail className="absolute right-4 top-3 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">Senha</label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="No mínimo 6 caracteres"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Repita sua senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms and conditions checkbox */}
            <label className="flex items-start gap-3 mt-2 cursor-pointer group">
              <div className="relative flex items-center h-5">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 bg-surface-light checked:border-primary checked:bg-primary transition-all"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <Check className="pointer-events-none absolute left-0.5 top-0.5 hidden text-white peer-checked:block" size={16} strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-500 leading-tight group-hover:text-slate-700 transition-colors select-none">
                Li e concordo com os{' '}
                <Link to="/termos-de-uso" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                  Termos e Condições
                </Link>{' '}
                e{' '}
                <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                  Política de Privacidade
                </Link>.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !termsAccepted}
              className={`mt-4 w-full h-12 rounded-xl text-white font-bold text-base shadow-lg transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0 ${
                isMaintenance
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                  : 'bg-primary hover:bg-primary-hover shadow-primary/30'
              }`}
            >
              {isMaintenance
                ? 'Sistema em Manutenção (Contatar Suporte)'
                : isPending
                ? 'Criando conta...'
                : 'Criar minha Conta Gratuita'}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-8 text-sm text-slate-500">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline hover:text-primary-hover transition-colors">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        context="signup"
      />
    </div>
  );
}
