/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // 👆 Add all your custom env variables here
  // readonly VITE_ANOTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
