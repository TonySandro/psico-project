declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const CONSENT_STORAGE_KEY = 'lgpd_cookie_consent';

/**
 * Updates Google Consent Mode v2 settings
 */
export function updateGtagConsent(granted: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const status = granted ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }
}

/**
 * Tracks a pageview event in Google Analytics
 */
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
}

/**
 * Reads the stored LGPD cookie consent status
 */
export function getStoredConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === 'granted' || value === 'denied') {
    return value;
  }
  return null;
}

/**
 * Saves consent status in localStorage and updates Gtag consent mode
 */
export function setStoredConsent(consent: 'granted' | 'denied') {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
    updateGtagConsent(consent === 'granted');
  }
}

/**
 * Clears stored consent (useful for testing or user reset)
 */
export function clearStoredConsent() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}
