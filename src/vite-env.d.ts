/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EDS_LOGIN: string;
  readonly VITE_EDS_PASSWORD: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
