import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '@/hooks/useAuth';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Check,
  Brain,
  AlertCircle
} from 'lucide-react';

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
  const { mutate: signup, isPending } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        navigate('/app/dashboard');
      },
      onError: () => {
        setErrorMessage('Erro ao criar conta. Tente novamente.');
      }
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      {/* Left Side: Visual / Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-primary p-12 overflow-hidden group">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#8b5cf6] blur-3xl mix-blend-multiply opacity-70"></div>
        </div>

        {/* Header Logo */}
        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm">
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NeuroPPAvalia</h1>
        </div>

        {/* Central Content */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-1 shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]">
            <img
              alt="Profissional analisando dados"
              className="h-64 w-full rounded-xl object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmm0huIGs0Z5WOSduOtH-ZiVT6ndzMUB_whUZ5ptNKT5_neXe8AB6LNjfT9fqebc9SS6MhkU6tbCEiiSCVGivkpl6AL8N78DW8WGfAOo4OeoHoQIJByh8nFWtZQaxBYZ0z_QV22nNH0UomUCPK6YrV3uZpW7ybRHsXRnGRYDNoBi_yI9ZB6c5xCzh0pPeVzOpi8LU4s8kQbx5SbHOwEsE3Zbv4HkefFLwxQefQGKEfKKORlPv3xraNBIALFW66sqIe5W2F2P6JzQcp"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-sm">
            Transforme sua gestão clínica hoje.
          </h2>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Junte-se a milhares de neuropsicopedagogos que simplificaram seus atendimentos e focaram no que realmente importa: seus pacientes.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 overflow-y-auto bg-background-light scrollbar-hide">
        <div className="w-full max-w-[480px] py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Mobile Logo (Visible only on < lg) */}
          <div className="lg:hidden flex items-center gap-2 mb-8 text-slate-900">
            <Brain className="text-primary" size={32} />
            <span className="text-xl font-bold">NeuroPPAvalia</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Crie sua conta</h2>
            <p className="text-slate-500 text-base">Gerencie seus atendimentos de forma simples e eficiente.</p>
          </div>

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
                  className="w-full h-12 px-4 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base pr-12"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-slate-100"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Me mostre a senha"}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="confirm-password">Confirmar Senha</label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 rounded-xl bg-surface-light border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-base pr-12"
                  id="confirm-password"
                  name="confirm-password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Repita sua senha"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-slate-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
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
                Li e concordo com os <a href="#" className="text-primary font-bold hover:underline">Termos de Uso</a> e <a href="#" className="text-primary font-bold hover:underline">Política de Privacidade</a>.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !termsAccepted}
              className="mt-4 w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-primary/30 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {isPending ? 'Criando conta...' : 'Criar minha conta'}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-8 text-sm text-slate-500">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline hover:text-primary-hover transition-colors">
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
