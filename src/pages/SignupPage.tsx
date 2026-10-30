import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup, useLogin } from '@/hooks/useAuth';
import signupImg from '../images/profissional-analisando-dados-neuropsicopedagogicos-nppavalia.webp';
import {
  Check,
  AlertCircle,
  HeartPulse,
  ArrowLeft,
  AlertTriangle,
  LifeBuoy,
  Mail,
  Copy
} from 'lucide-react';
import { isMaintenanceActive, MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';
import MaintenanceModal from '@/components/MaintenanceModal';

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setErrorMessage('Informe um número de WhatsApp válido com DDD');
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Aceite os termos para continuar');
      return;
    }

    signup({ name, email, phone, password, passwordConfirmation }, {
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
    <div className="bg-background-light font-display text-text-main h-screen overflow-hidden flex w-full">
      {/* Left Side: Visual / Branding (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-primary/5 items-center justify-center p-12 overflow-hidden">
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
      <div className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto bg-background-light relative">
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

        <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-24">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-primary mb-2">
                {/* Logo */}
                <div className="size-10 rounded-xl shadow-lg shadow-primary/20 bg-primary flex items-center justify-center text-white">
                  <HeartPulse size={22} />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-main">NPPAvalia</h2>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-text-main sm:text-4xl">
                Cadastre-se na Plataforma
              </h1>
              <p className="text-base text-gray-500 font-normal">
                Experimente o NPPAvalia gratuitamente e revolucione sua rotina clínica.
              </p>
            </div>

            {/* Aviso de Manutenção em Destaque */}
            {isMaintenance && (
              <div
                role="alert"
                className="bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 flex flex-col gap-3 shadow-sm"
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
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} />
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="name">Nome Completo</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">person</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    type="text"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="email">E-mail Profissional</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">mail</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@clinica.com"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* WhatsApp Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="phone">WhatsApp</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">call</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    type="tel"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="password">Senha</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">lock</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
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
                    className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#664c9a] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="confirmPassword">Confirmar Senha</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">lock</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
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
                    className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#664c9a] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Exibir confirmação de senha'}
                  >
                    <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Terms and conditions checkbox */}
              <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                <div className="relative flex items-center h-5">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#d7cfe7] bg-white checked:border-primary checked:bg-primary transition-all"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <Check className="pointer-events-none absolute left-0.5 top-0.5 hidden text-white peer-checked:block" size={16} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-500 leading-tight group-hover:text-text-main transition-colors select-none">
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
                className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                  isMaintenance
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isMaintenance
                  ? 'Sistema em Manutenção (Contatar Suporte)'
                  : isPending
                  ? 'Criando conta...'
                  : 'Criar minha Conta Gratuita'}
              </button>
            </form>

            {/* Footer */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm font-medium text-gray-500">Já possui uma conta?</p>
                <Link className="text-sm font-bold text-primary hover:text-primary/80 transition-colors" to="/login">
                  Faça login
                </Link>
              </div>

              <div className="w-full border-t border-gray-100 pt-4 mt-2">
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-xs text-gray-400 max-w-[320px]">
                    <span className="material-symbols-outlined align-middle text-sm mr-1">lock</span>
                    Ambiente seguro. Seus dados e de seus pacientes estão protegidos conforme a LGPD.
                  </p>
                  <p className="text-xs text-primary/70 font-medium bg-primary/5 px-3 py-1 rounded-full">
                    Plano gratuito de teste com acesso completo às ferramentas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="w-full py-6 text-center">
          <p className="text-xs text-gray-400">© 2026 NPPAvalia. Todos os direitos reservados.</p>
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
