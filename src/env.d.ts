/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_PINECONE_API_KEY: string;
  readonly VITE_PINECONE_ENVIRONMENT: string;
  readonly VITE_PINECONE_INDEX: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE: string;
  readonly VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE: string;
  readonly VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
