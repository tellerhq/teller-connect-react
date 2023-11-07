import {
  TellerConnectOptions,
  TellerConnectInstance,
} from './types';

interface ManagerState {
  teller: TellerConnectInstance | null;
  open: boolean;
}

export const createTeller = (
  config: TellerConnectOptions,
  creator: (config: TellerConnectOptions) => TellerConnectInstance
) => {
  const state: ManagerState = {
    teller: null,
    open: false,
  };

  if (typeof window === 'undefined' || !window.TellerConnect) {
    throw new Error('TellerConnect is not loaded');
  }

  state.teller = creator({
    ...config,
    onExit: () => {
      state.open = false;
      config.onExit && config.onExit();
    },
  });

  const open = () => {
    if (!state.teller) {
      return;
    }
    
    state.open = true;
    state.teller.open();
  };

  const destroy = () => {
    if (!state.teller) {
      return;
    }

    state.teller.destroy();
    state.teller = null;
  };

  return {
    open,
    destroy,
  };
};
