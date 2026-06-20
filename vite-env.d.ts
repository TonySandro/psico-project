/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_MERCADO_PAGO_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  MercadoPago?: any;
}


declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}