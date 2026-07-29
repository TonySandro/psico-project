import { useRef, useCallback } from 'react';
import { driver, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const LOCAL_STORAGE_KEY = 'npp_tour_completed';

export function usePlatformTour() {
  const driverRef = useRef<Driver | null>(null);

  const initDriver = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayColor: 'rgba(15, 23, 42, 0.65)',
      nextBtnText: 'Próximo →',
      prevBtnText: '← Anterior',
      doneBtnText: 'Entendi! 🎉',
      progressText: 'Passo {{current}} de {{total}}',
      onDestroyStarted: () => {
        driverObj.destroy();
        localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      },
      steps: [
        {
          element: '#tour-brand',
          popover: {
            title: '👋 Bem-vindo ao NPPAvalia!',
            description: 'Sua plataforma completa de avaliação psicológica e neuropsicológica. Vamos fazer um breve tour interativo pelas principais ferramentas.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#tour-dashboard-stats',
          popover: {
            title: '📊 Indicadores Rápidos',
            description: 'Acompanhe no dashboard seus pacientes ativos, inativos e novos atendimentos cadastrados no mês.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-dashboard',
          popover: {
            title: '🏠 Painel Principal',
            description: 'Visualização dos gráficos estatísticos de pacientes por faixa etária, escolaridade e testes mais utilizados.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-pacientes',
          popover: {
            title: '👥 Gestão de Pacientes',
            description: 'Cadastre pacientes, gerencie prontuários, acesse histórico de consultas e relatórios gerados.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-anamneses',
          popover: {
            title: '📝 Fichas de Anamnese',
            description: 'Crie e gerencie modelos de anamnese e envie links para os responsáveis responderem online.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-rel--professor',
          popover: {
            title: '🏫 Relatórios do Professor',
            description: 'Envie questionários online para professores e escolas reportarem o comportamento do paciente.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-testes',
          popover: {
            title: '🧪 Testes & Instrumentos',
            description: 'Aplique e corrija testes psicológicos e neuropsicológicos (como TDE-II e outros) com relatórios automatizados.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-nav-feedback',
          popover: {
            title: '💬 Feedback & Sugestões',
            description: 'Espaço direto para enviar comentários, sugestões ou tirar dúvidas com nossa equipe.',
            side: 'right',
            align: 'center',
          },
        },
        {
          element: '#tour-help-btn',
          popover: {
            title: '❓ Refazer o Tour',
            description: 'Dúvidas futuras? Clique neste ícone a qualquer momento para reiniciar este tour guiado!',
            side: 'bottom',
            align: 'end',
          },
        },
      ],
    });

    driverRef.current = driverObj;
    return driverObj;
  }, []);

  const startTour = useCallback(() => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }
    const driverObj = initDriver();
    driverObj.drive();
  }, [initDriver]);

  const checkAutoStart = useCallback(() => {
    const tourCompleted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!tourCompleted) {
      setTimeout(() => {
        startTour();
      }, 700);
    }
  }, [startTour]);

  return {
    startTour,
    checkAutoStart,
  };
}
