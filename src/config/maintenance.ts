/**
 * ==============================================================================
 * CONFIGURAÇÃO DE MODO DE MANUTENÇÃO (EXCLUSIVO FRONTEND)
 * ==============================================================================
 * 
 * COMO ATIVAR / DESATIVAR:
 * 
 * 1. PELO CÓDIGO (MAIS FÁCIL):
 *    Altere a constante `MAINTENANCE_ENABLED` abaixo para `true` (ativa) ou `false` (desativa).
 * 
 * 2. POR VARIÁVEL DE AMBIENTE (SEM PRECISAR MEXER NO CÓDIGO):
 *    Adicione no arquivo `.env` ou nas variáveis da Vercel / hospedagem:
 *    VITE_MAINTENANCE_MODE=true
 * 
 * 3. PARA TESTAR NO NAVEGADOR IMEDIATAMENTE (SEM RECOMPILAR):
 *    Abra o console do navegador (F12) e execute:
 *    window.toggleMaintenance(true);  // para ativar
 *    window.toggleMaintenance(false); // para desativar
 * ==============================================================================
 */

export const MAINTENANCE_ENABLED = false; // <-- MUDE PARA true PARA ATIVAR O MODO DE MANUTENÇÃO

export const MAINTENANCE_CONFIG = {
  // E-mail e assunto para atendimento emergencial
  supportEmail: 'suporte@nppavalia.com.br',
  supportSubject: 'Urgência - Recuperação de Dados durante Manutenção',
  supportBodyTemplate: `Olá, equipe de suporte do NPPAvalia,

Preciso recuperar dados com urgência durante o período de manutenção do sistema.

- Nome do profissional: 
- E-mail de cadastro: 
- Dados / Paciente(s) que preciso consultar com urgência: 
- Motivo da urgência (ex: atendimento clínico agendado hoje): 

Aguardo retorno. Obrigado!`,

  // Textos informativos
  title: 'Sistema em Manutenção',
  badge: 'Manutenção em Andamento',
  subtitle: 'Manutenção técnica de banco de dados e servidores',
  message: 'Estamos realizando uma manutenção preventiva em nossos servidores e banco de dados para garantir maior estabilidade e segurança. O acesso à plataforma está temporariamente suspenso.',
  loginAttemptNotice: 'O sistema está temporariamente indisponível para login devido à manutenção no banco de dados.',

  // Seção de urgência
  urgencyTitle: 'Precisa acessar ou recuperar algum dado com urgência?',
  urgencyMessage: 'Caso você tenha atendimentos agendados ou precise de acesso imediato a prontuários, anamneses ou relatórios, entre em contato com nosso plantão de suporte prioritário:',

  // Opções
  showGlobalBanner: true, // Mostra o banner no topo das páginas públicas
  blockLogin: true,       // Impede o envio de requisições de login ao backend offline
};

/**
 * Verifica se o modo de manutenção está ativado.
 * Prioridade:
 * 1. localStorage ('force_maintenance') - útil para testes locais no navegador
 * 2. Variável de ambiente VITE_MAINTENANCE_MODE
 * 3. Constante MAINTENANCE_ENABLED definida neste arquivo
 */
export function isMaintenanceActive(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('force_maintenance');
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  }

  const envValue = import.meta.env.VITE_MAINTENANCE_MODE;
  if (envValue === 'true' || envValue === '1') {
    return true;
  }

  return MAINTENANCE_ENABLED;
}

/**
 * Helper para gerar o link mailto completo com assunto e corpo pré-preenchidos
 */
export function getEmergencyMailtoUrl(): string {
  const email = encodeURIComponent(MAINTENANCE_CONFIG.supportEmail);
  const subject = encodeURIComponent(MAINTENANCE_CONFIG.supportSubject);
  const body = encodeURIComponent(MAINTENANCE_CONFIG.supportBodyTemplate);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

// Registra no window para testes rápidos pelo console do navegador
if (typeof window !== 'undefined') {
  window.toggleMaintenance = (enabled?: boolean) => {
    const nextState = enabled !== undefined ? enabled : !isMaintenanceActive();
    localStorage.setItem('force_maintenance', nextState ? 'true' : 'false');
    console.log(`[NPPAvalia] Modo de manutenção ${nextState ? 'ATIVADO' : 'DESATIVADO'}. Recarregando página...`);
    window.location.reload();
  };
}
