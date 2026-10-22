import { useState, useEffect } from 'react';
import { Wrench, Mail, X, LifeBuoy } from 'lucide-react';
import { isMaintenanceActive, MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';
import MaintenanceModal from './MaintenanceModal';

export default function MaintenanceBanner() {
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setActive(isMaintenanceActive());
    const isDismissed = sessionStorage.getItem('maintenance_banner_dismissed') === 'true';
    setDismissed(isDismissed);
  }, []);

  if (!active || dismissed || !MAINTENANCE_CONFIG.showGlobalBanner) {
    return (
      <MaintenanceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        context="general"
      />
    );
  }

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('maintenance_banner_dismissed', 'true');
  };

  return (
    <>
      <div
        role="alert"
        className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white shadow-md relative z-40 transition-all text-xs sm:text-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 flex-1 min-w-[260px]">
            <span className="p-1 rounded-md bg-white/20 shrink-0">
              <Wrench size={16} className="text-white" />
            </span>
            <p className="font-medium text-white/95 leading-tight">
              <strong className="font-bold underline decoration-white/40 mr-1.5">Aviso de Manutenção:</strong>
              Estamos realizando melhorias nos servidores. Em caso de urgência para recuperação de dados, entre em contato com nosso suporte.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-amber-900 font-bold hover:bg-amber-50 transition-colors shadow-sm text-xs"
            >
              <LifeBuoy size={14} className="text-amber-700" />
              <span>Suporte Urgente</span>
            </button>

            <a
              href={getEmergencyMailtoUrl()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/20 hover:bg-black/30 text-white font-medium transition-colors text-xs"
              title="Abrir aplicativo de e-mail"
            >
              <Mail size={13} />
              <span>{MAINTENANCE_CONFIG.supportEmail}</span>
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dispensar aviso por esta sessão"
              className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/20 transition-colors ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      <MaintenanceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        context="general"
      />
    </>
  );
}
