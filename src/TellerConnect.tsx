import React from 'react';

import { TellerConnectOptions } from './types';
import { useTellerConnect } from './useTellerConnect';

type PropTypes = TellerConnectOptions & React.HTMLProps<HTMLButtonElement>

export const TellerConnect: React.FC<PropTypes> = ({ children, className, style, ...opts }) => {
  const { error, open } = useTellerConnect({ ...opts });

  return (
    <button
      disabled={!!error}
      type="button"
      className={className}
      style={{
        padding: '6px 4px',
        outline: 'none',
        background: '#fff',
        border: '1px solid #f5f5f5',
        borderRadius: '5px',
        ...style,
      }}
      onClick={() => open()}
    >
      {children}
    </button>
  );
};

TellerConnect.displayName = 'TellerConnect';
