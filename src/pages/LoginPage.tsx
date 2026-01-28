import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { HeartPulse } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, {
      onSuccess: () => {
        navigate('/app/dashboard');
      }
    });
  };

  return (
    <div className="bg-background-light font-display text-text-main h-screen overflow-hidden flex w-full">
      {/* Left Side: Visual / Brand */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-primary/5 items-center justify-center p-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center opacity-90 transition-all duration-500 hover:scale-105"
          data-alt="Modern clean abstract medical interface background with soft blue and purple lighting"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlg164ysupHG0KdsZk8UC50RsX6Rpv16YvDQPLWAyVjP4Gtj8WBsalg2ZqXUq1gfPFRd8h-7951g_LRWsXTxhdo5F9kJjqq_EWRZ0TgFWFVTxKZbdWs0tiY1N4iNCBKOg4b4HMhC0_x7da0uymBPzS-pVK2rDOYgmkpGNC5zzBX0iB5dC4szITYpcx-kb6xILr27Dy1Oq-AvY-n3opeSOayNbzGbCmQzlVJSG_u7WH8qZSUx2Ws2sfF2Rf4Pms6AvcfuhuSwqK8i6U')" }}
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 max-w-md text-white">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <span className="material-symbols-outlined text-4xl text-white">psychology</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Transforme a gestão da sua clínica.
          </h2>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Organize prontuários, agendamentos e acompanhe a evolução cognitiva dos seus pacientes em um só lugar.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img alt="Avatar user 1" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzFjbAu8apEqmhsgjlz4fsINp0qCOdBuCk_P8QsIKs4nIjmZPMwZ8rQ3lmL-D7ss5p2AUyTO1AMsKhM-5Zj9IsEKbNF11PVn_qXIH7fJoJ4eNw5ddEfxpb53hU_m1brDFhAVvpX4c8Pl-DlDXySsqdZpeO2b6EoYwo-rmQ_ycJop51nIoVR8AimdyBq7ocwiWbSxWnzm8DdCY5bLd1A8y56N53YJT-weSrA7V9CZmOokeKIP1iRUOTW14rGU6EB_H3XL2ZLaDxHqKI" />
              <img alt="Avatar user 2" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc6zTRc5OUy8Z36vZySf9pxqm4SSjqWfEyYlFnz-Mdzky_HHGNCkh8r_aJFs_i-ZGbzPi4JExSPD6sAoeNAEDNQVNKuZyzyvjfasI8_1ryIcHaI8Yb71dbOKhV8aoJcv312-wROAgr7J39wjxAEw6OlyeO9LK9a7QIYExHF6ZkYwkxH8vOFHd8AWb6--j3LQQPtJccTkKmyFlzvv4PhMpdi3Guqa0d78EM9c8LOkouJerQNGVIfet1vmgIDbxOktNc4ut1Y8FJErtX" />
              <img alt="Avatar user 3" className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrUcD5DtLZrSWeBDDGc-09im5OVb-sYE8byI7r4PcUnUx2eEvYMRNjK8zK2OgCgS1iusI0Av2lmI2XeYnFjk0pLcSdaydRkbf6I5FsV6Yooo7YoCYOdJR1SfnF0Tpej3rnQDdG9l5zS_hv20XDEdfoL-eZYJFZstd4kYS5tGPa3qNwf65JAHLpAMH6r6pfscK5Ujt624pBCJCC_b-CXTGlMqRH7WvQramHrwQC4p0bQqnoyWclan_JAVZSiolETuOxR-SIC8fQu-tn" />
            </div>
            <p className="text-sm font-medium text-white/90">Mais de 2.000 profissionais confiam.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto bg-background-light">
        <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-24">
          <div className="w-full max-w-[420px] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-primary mb-2">
                {/* Logo SVG */}
                {/* Logo */}
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                  <HeartPulse size={24} />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-main">NPPAvalia</h2>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-text-main sm:text-4xl">
                Bem-vindo de volta
              </h1>
              <p className="text-base text-gray-500 font-normal">
                Acesse sua conta para gerenciar seus pacientes e organizar sua clínica.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                Email ou senha inválidos
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-normal text-text-main" htmlFor="email">E-mail</label>
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
                {/* <div className="flex justify-end mt-1">
                  <a className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" href="#">Esqueceu sua senha?</a>
                </div> */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm font-medium text-gray-500">Não tem uma conta?</p>
              <Link className="text-sm font-bold text-primary hover:text-primary/80 transition-colors" to="/signup">Cadastre-se</Link>
            </div>
          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="w-full py-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">© 2024 NPPAvalia. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}