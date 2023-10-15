import React from 'react';

import { TellerConnectPropTypes } from './types';
import { useTellerConnect } from './useTellerConnect';

export const TellerConnect: React.FC<TellerConnectPropTypes> = props => {
  const { children, style, className, ...config } = props;
  const { error, open } = useTellerConnect({ ...config });

  return (
    <button
      disabled={Boolean(error)}
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
