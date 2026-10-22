import { useState, useEffect } from 'react';
import { AlertTriangle, Mail, Copy, Check, X, ExternalLink, LifeBuoy } from 'lucide-react';
import { MAINTENANCE_CONFIG, getEmergencyMailtoUrl } from '@/config/maintenance';

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'login' | 'signup' | 'general';
}

export default function MaintenanceModal({ isOpen, onClose, context = 'login' }: MaintenanceModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MAINTENANCE_CONFIG.supportEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback para navegadores sem permissão de clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-amber-200/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa decorativa superior */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar aviso"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="size-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <AlertTriangle size={26} />
            </div>
            <div className="flex-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                {MAINTENANCE_CONFIG.badge}
              </div>
              <h2 id="maintenance-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {context === 'login' ? 'Login Indisponível no Momento' : MAINTENANCE_CONFIG.title}
              </h2>
            </div>
          </div>

          {/* Mensagem descritiva */}
          <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed">
            {context === 'login'
              ? `${MAINTENANCE_CONFIG.loginAttemptNotice} ${MAINTENANCE_CONFIG.message}`
              : MAINTENANCE_CONFIG.message}
          </p>

          {/* Box de Urgência em Destaque */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-300/80 rounded-xl p-4 sm:p-5 mb-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base mb-1.5">
              <LifeBuoy size={20} className="text-amber-700 shrink-0" />
              <span>{MAINTENANCE_CONFIG.urgencyTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed mb-3">
              {MAINTENANCE_CONFIG.urgencyMessage}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              <a
                href={getEmergencyMailtoUrl()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow"
              >
                <Mail size={16} />
                <span>Enviar E-mail de Urgência</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white hover:bg-amber-100/50 border border-amber-300 text-amber-900 font-medium text-sm transition-colors"
                title="Copiar endereço de e-mail"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    <span className="text-green-700 font-semibold">E-mail Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-amber-700" />
                    <span>Copiar ({MAINTENANCE_CONFIG.supportEmail})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer de ações */}
          <div className="flex justify-end items-center gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Entendido, vou aguardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
