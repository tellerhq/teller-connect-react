import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTellerConnect, TellerConnectOptions } from './';

import useScript from 'react-script-hook';
jest.mock('react-script-hook');
const mockedUseScript = useScript as jest.Mock;

const ScriptLoadingState = {
  LOADING: [true, null],
  LOADED: [false, null],
  ERROR: [false, 'SCRIPT_LOAD_ERROR'],
};

const ReadyState = {
  READY: 'READY',
  NOT_READY: 'NOT_READY',
  ERROR: 'ERROR',
  NO_ERROR: 'NO_ERROR',
};

const HookComponent: React.FC<{ config: TellerConnectOptions }> = ({ config }) => {
  const { open, ready, error } = useTellerConnect(config);
  return (
    <div>
      <button onClick={() => open()}>Open</button>
      <div>{ready ? ReadyState.READY : ReadyState.NOT_READY}</div>
      <div>{error ? ReadyState.ERROR : ReadyState.NO_ERROR}</div>
    </div>
  );
};

describe('useTellerConnect', () => {
  const config: TellerConnectOptions = {
    applicationId: 'app_id',
    environment: 'sandbox',
    products: ['transactions'],
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    mockedUseScript.mockImplementation(() => ScriptLoadingState.LOADED);
    window.TellerConnect = {
      setup: ({ onInit }) => {
        onInit && onInit();
        return {
          create: jest.fn(),
          open: jest.fn(),
          destroy: jest.fn(),
        };
      },
      open: jest.fn(),
      destroy: jest.fn(),
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render with token', async () => {
    render(<HookComponent config={config} />);
    expect(screen.getByRole('button'));
    expect(screen.getByText(ReadyState.READY));
    expect(screen.getByText(ReadyState.NO_ERROR));
  });

  it('should not be ready when script is loading', async () => {
    mockedUseScript.mockImplementation(() => ScriptLoadingState.LOADING);
    render(<HookComponent config={config} />);
    expect(screen.getByText(ReadyState.NOT_READY));
    expect(screen.getByText(ReadyState.NO_ERROR));
  });

  it('should not be ready if applicationId is missing', async () => {
    // NOTE: Casting to any is necessary here because the TellerConnectOptions interface marks
    //       applicationId as required
    render(<HookComponent config={{ ...config, applicationId: undefined as any }} />);
    expect(screen.getByText(ReadyState.NOT_READY));
    expect(screen.getByText(ReadyState.NO_ERROR));
  });

  it('should not be ready if script fails to load', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {});
    mockedUseScript.mockImplementation(() => ScriptLoadingState.ERROR);

    render(<HookComponent config={config} />);
    expect(screen.getByText(ReadyState.NOT_READY));
    expect(screen.getByText(ReadyState.ERROR));
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading TellerConnect:',
      'SCRIPT_LOAD_ERROR'
    );
  });

  it('should not be ready when window.TellerConnect is missing', () => {
  (window as any).TellerConnect = undefined;

  render(<HookComponent config={config} />);
    expect(screen.getByText(ReadyState.NOT_READY));
    expect(screen.getByText(ReadyState.NO_ERROR));
  });

  it('should call teller.destroy() when component unmounts', () => {
    const destroySpy = jest.fn();
    window.TellerConnect = {
      ...window.TellerConnect,
      setup: () => ({
        create: jest.fn(),
        open: jest.fn(),
        destroy: destroySpy,
      }),
    };

    const { unmount } = render(<HookComponent config={config} />);
    unmount();
    expect(destroySpy).toHaveBeenCalled();
  });
});
