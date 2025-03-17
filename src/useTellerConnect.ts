import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import { createTeller } from './manager';
import { TellerConnectInstance, TellerConnectOptions } from './types';

const TC_JS = 'https://cdn.teller.io/connect/connect.js';

export const useTellerConnect = (options: TellerConnectOptions) => {
  const [loading, error] = useScript({
    src: TC_JS,
    checkForExisting: true,
  });

  const [teller, setTeller] = useState<TellerConnectInstance | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Array's ref could change, so we want to enforce value-comparison:
  const productsString = (options.products || []).slice().sort().join(',');

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!options.applicationId) {
      return;
    }

    if (error || !window.TellerConnect) {
      console.error('Error loading TellerConnect:', error);
      return;
    }

    if (teller != null) {
      teller.destroy()
    }

    const next = createTeller(
      {
        ...options,
        onInit: () => {
          setIframeLoaded(true);
          options.onInit && options.onInit();
        },
      },
      window.TellerConnect.setup
    );

    setTeller(next);

    return () => next.destroy();
  }, [
    loading,
    error,
    options.applicationId,
    options.enrollmentId,
    options.connectToken,
    productsString
  ]);

  const ready = teller != null && (!loading || iframeLoaded);

  const logIt = () => {
    if (!options.applicationId) {
      console.error('teller-connect-react: open() called without a valid applicationId.');
    }
  };

  return {
    error,
    ready,
    open: teller ? teller.open : logIt,
  };
};
