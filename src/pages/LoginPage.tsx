import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import loginBg from '../images/consultorio-neuropsicopedagogia-nppavalia.webp';
import { HeartPulse, ArrowLeft, AlertTriangle, LifeBuoy, Mail, Copy, Check } from 'lucide-react';
import { isMaintenanceActive, MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';
import MaintenanceModal from '@/components/MaintenanceModal';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRecoverPassword, setIsRecoverPassword] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverStatus, setRecoverStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [cooldown, setCooldown] = useState(0);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isMaintenance = isMaintenanceActive();
  const { mutate: login, isPending, error } = useLogin();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

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

    // Em modo de manutenção, interceptamos o envio para evitar falhas no backend fora do ar
    // e orientamos o usuário diretamente para o canal de emergência
    if (isMaintenance && MAINTENANCE_CONFIG.blockLogin) {
      setShowMaintenanceModal(true);
      return;
    }

    login({ email, password }, {
      onSuccess: () => {
        navigate('/app/dashboard');
      }
    });
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isMaintenance) {
      setShowMaintenanceModal(true);
      return;
    }

    if (cooldown > 0) return;
    setRecoverStatus('loading');
    try {
      const { api } = await import('@/services/api');
      await api.post(`/forgot-password`, { email: recoverEmail });
      setRecoverStatus('success');
      setCooldown(60);
      setTimeout(() => {
        setRecoverStatus('idle');
      }, 5000);
    } catch {
      // Regardless of error, show generic success for privacy
      setRecoverStatus('success');
      setCooldown(60);
      setTimeout(() => {
        setRecoverStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="bg-background-light font-display text-text-main h-screen overflow-hidden flex w-full">
      {/* Left Side: Visual / Brand */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-primary/5 items-center justify-center p-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center opacity-90 transition-all duration-500 hover:scale-105"
          role="img"
          aria-label="Consultório de neuropsicopedagogia moderno e acolhedor - NPPAvalia"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 max-w-md text-white">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
            <HeartPulse size={36} />
          </div>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Para Psicopedagogos & Neuropsicopedagogos</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Gestão de Avaliações Psicopedagógicas e Neuropsicopedagógicas.
          </h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Centralize anamneses, aplique testes clínicos padronizados e gere relatórios automatizados de forma prática.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
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
                {isRecoverPassword ? 'Recuperar Senha' : 'Portal do Profissional'}
              </h1>
              <p className="text-base text-gray-500 font-normal">
                {isRecoverPassword
                  ? 'Se existir uma conta com esse e-mail, enviaremos um link de redefinição.'
                  : 'Acesse seus pacientes, anamneses, testes psicopedagógicos e relatórios.'}
              </p>
            </div>

            {/* AVISO DE MANUTENÇÃO EM DESTAQUE */}
            {isMaintenance && (
              <div
                role="alert"
                className="bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 flex flex-col gap-3.5 shadow-sm"
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
                      {MAINTENANCE_CONFIG.message}
                    </p>
                  </div>
                </div>

                {/* Box de Urgência de Recuperação de Dados */}
                <div className="bg-white rounded-xl p-3.5 border border-amber-200/90 shadow-xs flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs sm:text-sm">
                    <LifeBuoy size={16} className="text-amber-700 shrink-0" />
                    <span>{MAINTENANCE_CONFIG.urgencyTitle}</span>
                  </div>
                  <p className="text-xs text-amber-900/80 leading-normal">
                    {MAINTENANCE_CONFIG.urgencyMessage}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={getEmergencyMailtoUrl()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <Mail size={13} />
                      <span>Enviar E-mail de Urgência</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200/90 text-amber-900 font-medium text-xs transition-colors"
                      title="Copiar e-mail de suporte"
                    >
                      {copiedEmail ? (
                        <>
                          <Check size={13} className="text-green-600" />
                          <span className="text-green-700 font-bold">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} className="text-amber-700" />
                          <span>Copiar ({MAINTENANCE_CONFIG.supportEmail})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AVISO DE CONTA EXCLUÍDA */}
            {location.state?.accountDeleted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm text-center font-medium shadow-xs">
                Sua conta e todos os dados associados foram excluídos com sucesso.
              </div>
            )}

            {isRecoverPassword && (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm flex flex-col gap-1">
                <p>• Verifique sua caixa de entrada e spam.</p>
                <p>• O link é válido por 30 minutos.</p>
                <p>• Se você pediu mais de uma vez, use o e-mail mais recente.</p>
              </div>
            )}

            {!isRecoverPassword && error && !isMaintenance && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {(() => {
                  const err = error as any;
                  if (err?.response?.status === 429) {
                    const data = err?.response?.data;
                    return typeof data === 'string' ? data : (data?.message || 'Muitas tentativas. Tente novamente mais tarde.');
                  }
                  const data = err?.response?.data;
                  const message = typeof data === 'string' ? data : (data?.message || data?.error);
                  if (message === 'Unauthorized') {
                    return 'Conta não verificada. Por favor, verifique seu e-mail.';
                  }
                  return 'Email ou senha inválidos';
                })()}
              </div>
            )}

            {isRecoverPassword && recoverStatus === 'error' && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                Erro ao tentar enviar o link de recuperação. Tente novamente mais tarde.
              </div>
            )}

            {isRecoverPassword && recoverStatus === 'success' && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center font-medium">
                Se o e-mail existir, um link foi enviado! Verifique sua caixa de entrada.
              </div>
            )}

            {/* Form */}
            {isRecoverPassword ? (
              <form onSubmit={handleRecoverPassword} className="flex flex-col gap-5">
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-normal text-text-main" htmlFor="recoverEmail">E-mail da conta</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">mail</span>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                      id="recoverEmail"
                      placeholder="Seu e-mail"
                      type="email"
                      value={recoverEmail}
                      onChange={(e) => setRecoverEmail(e.target.value)}
                      required
                      disabled={recoverStatus === 'loading' || recoverStatus === 'success'}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={recoverStatus === 'loading' || cooldown > 0 || !recoverEmail}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isMaintenance
                    ? 'Manutenção em Andamento (Suporte)'
                    : recoverStatus === 'loading'
                    ? 'Enviando...'
                    : cooldown > 0
                    ? `Aguarde ${cooldown}s para reenviar`
                    : 'Enviar Link de Recuperação'}
                </button>

                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => setIsRecoverPassword(false)}
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Voltar para o Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-normal text-text-main" htmlFor="email">E-mail cadastrado</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">mail</span>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                      id="email"
                      placeholder="exemplo@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-normal text-text-main" htmlFor="password">Senha</label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">lock</span>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                      id="password"
                      placeholder="Digite sua senha"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#664c9a] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => setIsRecoverPassword(true)}
                      className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Esqueceu sua senha?
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                    isMaintenance
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {isMaintenance
                    ? 'Sistema em Manutenção (Contatar Suporte)'
                    : isPending
                    ? 'Entrando...'
                    : 'Entrar'}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm font-medium text-gray-500">Ainda não possui cadastro?</p>
                <Link className="text-sm font-bold text-primary hover:text-primary/80 transition-colors" to="/signup">Cadastre-se gratuitamente</Link>
              </div>

              <div className="w-full border-t border-gray-100 pt-4 mt-2">
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-xs text-gray-400 max-w-[300px]">
                    <span className="material-symbols-outlined align-middle text-sm mr-1">lock</span>
                    Ambiente seguro. Seus dados e de seus pacientes estão protegidos conforme a <a href="#" className="underline hover:text-primary">LGPD</a>.
                  </p>
                  <p className="text-xs text-primary/70 font-medium bg-primary/5 px-3 py-1 rounded-full">
                    Plano de assinatura com acesso completo a testes e relatórios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="w-full py-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2024 NPPAvalia. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* MODAL DE URGÊNCIA EM CASO DE TENTATIVA DE LOGIN */}
      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        context="login"
      />
    </div>
  );
}
