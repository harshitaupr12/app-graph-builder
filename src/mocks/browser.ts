import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Suppress warnings in development
if (process.env.NODE_ENV === 'development') {
  worker.events.removeAllListeners();
}
