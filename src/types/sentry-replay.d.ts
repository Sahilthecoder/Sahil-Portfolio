declare module '@sentry/replay' {
  import { Integration } from '@sentry/types';
  
  interface ReplayConfiguration {
    // Add any specific configuration options you're using
    // For example:
    blockAllMedia?: boolean;
    blockClass?: string | RegExp;
    blockSelector?: string;
    maskAllText?: boolean;
    maskClass?: string | RegExp;
    maskInputOptions?: Record<string, boolean>;
    maskTextClass?: string | RegExp;
    maskTextSelector?: string;
    networkCaptureBodies?: boolean;
    networkDetailAllowUrls?: Array<string | RegExp>;
    networkDetailDenyUrls?: Array<string | RegExp>;
    networkCaptureHeaders?: boolean;
    stickySession?: boolean;
    useCompression?: boolean;
    useCompressionOption?: boolean;
    sessionSampleRate?: number;
    errorSampleRate?: number;
    flushMinDelay?: number;
    flushMaxDelay?: number;
    minReplayDuration?: number;
    replaysSessionSampleRate?: number;
    replaysOnErrorSampleRate?: number;
  }

  export class Replay implements Integration {
    public static id: string;
    public name: string;
    
    constructor(options?: ReplayConfiguration);
    
    public setupOnce(): void;
    public start(): void;
    public stop(): void;
  }
  
  // Export any other types or values you might be using from @sentry/replay
  export * from '@sentry/replay/types/types';
}
