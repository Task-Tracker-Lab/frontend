'use client';

import { useEffect } from 'react';
import { faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

let isFaroInitialized = false;

export default function FrontendObservability() {
  useEffect(() => {
    if (isFaroInitialized || faro.api) {
      return;
    }

    const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;
    const appName = process.env.NEXT_PUBLIC_FARO_APP_NAME;

    if (!faroUrl || !appName) {
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const traceHeaderCorsUrls = apiBaseUrl ? [new URL(apiBaseUrl).origin] : [];

    try {
      initializeFaro({
        url: faroUrl,
        // Basic metadata allows filtering by env/release in Grafana Explore.
        app: {
          name: appName,
          namespace: process.env.NEXT_PUBLIC_FARO_APP_NAMESPACE || undefined,
          version: process.env.NEXT_PUBLIC_FARO_APP_VERSION || '1.0.0',
          environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development',
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation({
            instrumentationOptions: {
              propagateTraceHeaderCorsUrls: traceHeaderCorsUrls,
            },
          }),
        ],
      });

      isFaroInitialized = true;
    } catch {
      // Silent fail: observability should never break user flows.
    }
  }, []);

  return null;
}
