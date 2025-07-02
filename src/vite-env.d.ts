/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_PINECONE_API_KEY: string;
  readonly VITE_PINECONE_ENVIRONMENT: string;
  readonly VITE_PINECONE_INDEX: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly meta: {
    readonly env: 'development' | 'production' | 'test';
    readonly MODE: 'development' | 'production';
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly SSR: boolean;
  };
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';
declare module '*.svg';
declare module '*.ico';
declare module '*.webm';
declare module '*.mp4';
declare module '*.mp3';
declare module '*.wav';
declare module '*.ogg';
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
