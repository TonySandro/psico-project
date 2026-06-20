const PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || '';

let mpInstance: any = null;

/**
 * Initialize and get the singleton Mercado Pago instance.
 * Useful for initializing the SDK on demand outside React components.
 */
export const getMercadoPago = () => {
  if (mpInstance) {
    return mpInstance;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  if (!window.MercadoPago) {
    console.warn('Mercado Pago SDK is not loaded on window object yet.');
    return null;
  }

  if (!PUBLIC_KEY) {
    console.error('VITE_MERCADO_PAGO_PUBLIC_KEY is not defined in environment variables.');
    return null;
  }

  try {
    mpInstance = new window.MercadoPago(PUBLIC_KEY, {
      locale: 'pt-BR',
    });
    return mpInstance;
  } catch (error) {
    console.error('Failed to initialize Mercado Pago SDK:', error);
    return null;
  }
};
