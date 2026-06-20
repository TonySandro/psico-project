import { useEffect, useState } from 'react';

const SDK_URL = 'https://sdk.mercadopago.com/js/v2';
const PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || '';

/**
 * Custom hook to dynamically load and initialize the Mercado Pago SDK.
 * 
 * Returns:
 * - `mp`: The initialized Mercado Pago instance or `null` if not loaded yet.
 * - `loading`: Boolean indicating if the SDK is loading/initializing.
 * - `error`: Error object if loading or initialization fails.
 */
export const useMercadoPago = () => {
  const [mp, setMp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      const keyError = new Error('VITE_MERCADO_PAGO_PUBLIC_KEY is not defined in environment variables.');
      console.error(keyError.message);
      setError(keyError);
      setLoading(false);
      return;
    }

    // If Mercado Pago is already loaded on the window, initialize it immediately
    if (window.MercadoPago) {
      try {
        const instance = new window.MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
        setMp(instance);
        setLoading(false);
      } catch (err) {
        console.error('Error initializing Mercado Pago SDK:', err);
        setError(err as Error);
        setLoading(false);
      }
      return;
    }

    // Find if the script tag was already added in the document
    let script = document.querySelector(`script[src="${SDK_URL}"]`) as HTMLScriptElement;

    const handleScriptLoad = () => {
      try {
        if (window.MercadoPago) {
          const instance = new window.MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
          setMp(instance);
        } else {
          throw new Error('Mercado Pago SDK loaded but window.MercadoPago is undefined');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error initializing Mercado Pago SDK after script load:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    const handleScriptError = () => {
      const loadError = new Error('Failed to load Mercado Pago SDK script');
      console.error(loadError.message);
      setError(loadError);
      setLoading(false);
    };

    if (!script) {
      // Create and inject script dynamically if not found
      script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }

    script.addEventListener('load', handleScriptLoad);
    script.addEventListener('error', handleScriptError);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
    };
  }, []);

  return { mp, loading, error };
};
