import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { api } from '@/services/api';
import loginBg from '../images/consultorio-neuropsicopedagogia-nppavalia.webp';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token) {
      setStatus('error');
      setErrorMessage('Link de recuperação inválido ou ausente.');
      return;
    }

    if (password !== passwordConfirmation) {
      setStatus('error');
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setStatus('loading');
    try {
      await api.post('/reset-password', { token, password, passwordConfirmation });
      setStatus('success');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setStatus('error');
      const errData = err?.response?.data;
      setErrorMessage(
        typeof errData === 'string' ? errData : (errData?.message || errData?.error || 'Link expirado ou inválido. Tente solicitar a recuperação novamente.')
      );
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
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <span className="material-symbols-outlined text-4xl text-white">neurology</span>
          </div>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Exclusivo para Psicopedagogos</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Gestão completa de Avaliações Neuropsicopedagógicas.
          </h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Centralize avaliações, aplique testes padronizados (Token Test, Stroop) e gere relatórios clínicos automáticos.
            Acompanhe a evolução cognitiva dos seus pacientes em um único ambiente seguro.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto bg-background-light">
        <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-24">
          <div className="w-full max-w-[420px] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-primary mb-2">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                  <HeartPulse size={24} />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-main">NPPAvalia</h2>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-text-main sm:text-4xl">
                Nova Senha
              </h1>
              <p className="text-base text-gray-500 font-normal">
                Crie uma nova senha de acesso para sua conta.
              </p>
            </div>

            {status === 'error' && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center">
                Senha atualizada com sucesso! Redirecionando para o login...
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="password">Nova Senha</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">lock</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                    id="password"
                    placeholder="Digite sua nova senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    minLength={6}
                  />
                  <button
                    className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#664c9a] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="passwordConfirmation">Confirmar Nova Senha</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#664c9a] z-10 pointer-events-none">lock</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d7cfe7] bg-white h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#664c9a]/60 transition-all"
                    id="passwordConfirmation"
                    placeholder="Confirme sua nova senha"
                    type={showPasswordConfirmation ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    minLength={6}
                  />
                  <button
                    className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#664c9a] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    type="button"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  >
                    <span className="material-symbols-outlined">{showPasswordConfirmation ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success' || !token}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Atualizando...' : 'Atualizar Senha'}
              </button>

              <div className="flex justify-center mt-2">
                <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Voltar para o Login
                </Link>
              </div>
            </form>

            <div className="w-full border-t border-gray-100 pt-4 mt-2">
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-xs text-gray-400 max-w-[300px]">
                  <span className="material-symbols-outlined align-middle text-sm mr-1">lock</span>
                  Ambiente seguro. Seus dados e de seus pacientes estão protegidos conforme a LGPD.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="w-full py-6 text-center mt-auto">
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2024 NPPAvalia. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
